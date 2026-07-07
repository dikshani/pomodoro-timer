type SessionsProps = {
  sessionCount: number;
};

function Sessions({ sessionCount }: SessionsProps) {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h3>Completed Sessions: {sessionCount}</h3>
    </div>
  );
}

export default Sessions;
