function Settings() {
  return (
    <div className="settings">
      <h3>Settings</h3>

      <div className="settings-row">
        <label>Work Session</label>
        <input type="number" defaultValue={25} />
      </div>

      <div className="settings-row">
        <label>Short Break</label>
        <input type="number" defaultValue={5} />
      </div>

      <div className="settings-row">
        <label>Long Break</label>
        <input type="number" defaultValue={15} />
      </div>

      <button>Save Settings</button>
    </div>
  );
}

export default Settings;
