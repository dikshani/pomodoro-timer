type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({
  darkMode,
  setDarkMode,
}: HeaderProps) {
  return (
    <div className="header">
      <h1>🍅 Pomodoro Timer</h1>

      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Header;
