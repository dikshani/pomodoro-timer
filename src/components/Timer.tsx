type TimerProps = {
  timeLeft: number;
};

function Timer({ timeLeft }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer-card">
      <h2>WORK SESSION</h2>

      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h1>
    </div>
  );
}

export default Timer;
