import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Sessions from "./components/Sessions";
import Settings from "./components/Settings";
import Statistics from "./components/Statistics";

function App() {
  // Settings
  const [workTime, setWorkTime] = useState(() => {
    return Number(localStorage.getItem("workTime")) || 25;
  });

  const [shortBreak, setShortBreak] = useState(() => {
    return Number(localStorage.getItem("shortBreak")) || 5;
  });

  const [longBreak, setLongBreak] = useState(() => {
    return Number(localStorage.getItem("longBreak")) || 15;
  });

  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Timer
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [sessionType, setSessionType] =
    useState<"work" | "shortBreak" | "longBreak">("work");

  const [sessionCount, setSessionCount] = useState(0);

  const [totalFocusTime, setTotalFocusTime] = useState(() => {
    return Number(localStorage.getItem("totalFocusTime")) || 0;
  });

  const getSessionTime = (
    type: "work" | "shortBreak" | "longBreak"
  ) => {
    switch (type) {
      case "work":
        return workTime * 60;
      case "shortBreak":
        return shortBreak * 60;
      case "longBreak":
        return longBreak * 60;
    }
  };

  // Notification Sound
  const playNotification = () => {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = 800;

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 1
    );

    oscillator.stop(audioContext.currentTime + 1);
  };

  // Save Theme
  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Timer Logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);

          playNotification();

          if (sessionType === "work") {
            const newCount = sessionCount + 1;
            setSessionCount(newCount);

            const updatedFocusTime =
              totalFocusTime + workTime;

            setTotalFocusTime(updatedFocusTime);

            localStorage.setItem(
              "totalFocusTime",
              updatedFocusTime.toString()
            );

            if (newCount % 4 === 0) {
              setSessionType("longBreak");
              return getSessionTime("longBreak");
            } else {
              setSessionType("shortBreak");
              return getSessionTime("shortBreak");
            }
          } else {
            setSessionType("work");
            return getSessionTime("work");
          }
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    sessionType,
    sessionCount,
    workTime,
    shortBreak,
    longBreak,
    totalFocusTime,
  ]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getSessionTime(sessionType));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("workTime", workTime.toString());
    localStorage.setItem("shortBreak", shortBreak.toString());
    localStorage.setItem("longBreak", longBreak.toString());

    setIsRunning(false);
    setSessionType("work");
    setTimeLeft(workTime * 60);
  };

  // Progress Bar
  const totalTime = getSessionTime(sessionType);

  const progress =
    ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Timer
          timeLeft={timeLeft}
          sessionType={sessionType}
          progress={progress}
        />

        <Controls
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onReset={handleReset}
        />

        <Sessions sessionCount={sessionCount} />

        <Statistics
          sessionCount={sessionCount}
          totalFocusTime={totalFocusTime}
        />

        <Settings
          workTime={workTime}
          setWorkTime={setWorkTime}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  );
}

export default App;
