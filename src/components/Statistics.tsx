type StatisticsProps = {
  sessionCount: number;
  totalFocusTime: number;
};

function Statistics({
  sessionCount,
  totalFocusTime,
}: StatisticsProps) {
  return (
    <div className="statistics">
      <h3>📊 Statistics</h3>

      <div className="stats-row">
        <span>✅ Completed Sessions</span>
        <strong>{sessionCount}</strong>
      </div>

      <div className="stats-row">
        <span>⏱ Total Focus Time</span>
        <strong>{totalFocusTime} min</strong>
      </div>
    </div>
  );
}

export default Statistics;
