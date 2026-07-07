type TimerProps = {
  timeLeft: number;
  sessionType: "work" | "shortBreak" | "longBreak";
};

function Timer({ timeLeft, sessionType }: TimerProps) {
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
    </div>
  );
}

export default Timer;
