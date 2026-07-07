import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Sessions from "./components/Sessions";
import Settings from "./components/Settings";

function App() {
  const [workTime, setWorkTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [sessionType, setSessionType] =
    useState<"work" | "shortBreak" | "longBreak">("work");

  const [sessionCount, setSessionCount] = useState(0);

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

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);

          // Auto start next session
          setIsRunning(true);

          if (sessionType === "work") {
            const newCount = sessionCount + 1;
            setSessionCount(newCount);

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
  ]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getSessionTime(sessionType));
  };

  const handleSaveSettings = () => {
    setIsRunning(false);
    setTimeLeft(getSessionTime(sessionType));
  };

  return (
    <div className="app">
      <div className="container">
        <Header />

        <Timer
          timeLeft={timeLeft}
          sessionType={sessionType}
        />

        <Controls
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          onReset={handleReset}
        />

        <Sessions sessionCount={sessionCount} />

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
