import type { Dispatch, SetStateAction } from "react";

type SettingsProps = {
  workTime: number;
  setWorkTime: Dispatch<SetStateAction<number>>;

  shortBreak: number;
  setShortBreak: Dispatch<SetStateAction<number>>;

  longBreak: number;
  setLongBreak: Dispatch<SetStateAction<number>>;

  onSave: () => void;
};

function Settings({
  workTime,
  setWorkTime,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  onSave,
}: SettingsProps) {
  return (
    <div className="settings">
      <h3>Settings</h3>

      <div className="settings-row">
        <label htmlFor="work-time">Work Session (minutes)</label>
        <input
          id="work-time"
          type="number"
          min="1"
          value={workTime}
          onChange={(e) => setWorkTime(Number(e.target.value))}
        />
      </div>

      <div className="settings-row">
        <label htmlFor="short-break">Short Break (minutes)</label>
        <input
          id="short-break"
          type="number"
          min="1"
          value={shortBreak}
          onChange={(e) => setShortBreak(Number(e.target.value))}
        />
      </div>

      <div className="settings-row">
        <label htmlFor="long-break">Long Break (minutes)</label>
        <input
          id="long-break"
          type="number"
          min="1"
          value={longBreak}
          onChange={(e) => setLongBreak(Number(e.target.value))}
        />
      </div>

      <button onClick={onSave}>Save Settings</button>
    </div>
  );
}

export default Settings;
