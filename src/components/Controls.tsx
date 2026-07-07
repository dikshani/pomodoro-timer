import type { Dispatch, SetStateAction } from "react";

type ControlsProps = {
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  onReset: () => void;
};

function Controls({ isRunning, setIsRunning, onReset }: ControlsProps) {
  return (
    <div className="controls">
      <button onClick={() => setIsRunning(true)} disabled={isRunning}>
        ▶ Start
      </button>

      <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
        ⏸ Pause
      </button>

      <button onClick={onReset}>🔄 Reset</button>
    </div>
  );
}

export default Controls;
