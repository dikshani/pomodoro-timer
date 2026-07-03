
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
 
	useEffect(() => {

  if (!isRunning) return;

const interval = setInterval(() => {
  setTimeLeft((prevTime) => {
    if (prevTime <= 1) {
      clearInterval(interval);
      setIsRunning(false);
      return 0;
    }

    return prevTime - 1;
  });
}, 1000);

  return () => clearInterval(interval);

}, [isRunning]);

const handleReset = () => {
  setIsRunning(false);
  setTimeLeft(25 * 60);
};

	return (
    <div className="app">
      <div className="container">
        <Header />

<p>Running: {isRunning ? "Yes" : "No"}</p>

        <Timer timeLeft={timeLeft} />
        
	<Controls
  isRunning={isRunning}
  setIsRunning={setIsRunning}
  onReset={handleReset}
/>
	
	<Sessions />
        <Settings />
      </div>
    </div>
  );
}

export default App;
