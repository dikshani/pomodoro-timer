type TimerProps = {
  timeLeft: number;
  sessionType: "work" | "shortBreak" | "longBreak";
  progress: number;
};

function Timer({
  timeLeft,
  sessionType,
  progress,
}: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const title =
    sessionType === "work"
      ? "WORK SESSION"
      : sessionType === "shortBreak"
      ? "SHORT BREAK"
      : "LONG BREAK";

  return (
    <div className="timer-card">
      <h2>{title}</h2>

      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Timer;
