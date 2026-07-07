import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import Sessions from "./components/Sessions";
import Settings from "./components/Settings";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

	const [workTime, setWorkTime] = useState(25);
const [shortBreak, setShortBreak] = useState(5);
const [longBreak, setLongBreak] = useState(15);

  const [sessionType, setSessionType] =
    useState<"work" | "shortBreak" | "longBreak">("work");

  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          // session complete logic
          setSessionCount((prev) => prev + 1);

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workTime * 60);
  };
	const handleSaveSettings = () => {
  setIsRunning(false);

  if (sessionType === "work") {
    setTimeLeft(workTime * 60);
  } else if (sessionType === "shortBreak") {
    setTimeLeft(shortBreak * 60);
  } else {
    setTimeLeft(longBreak * 60);
  }
};
	

	console.log("Work Time:", workTime);
  return (
    <div className="app">
      <div className="container">
        <Header />

        <Timer timeLeft={timeLeft} />

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
