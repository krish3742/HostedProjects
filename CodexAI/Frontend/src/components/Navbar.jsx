import { LightbulbIcon, MoonIcon } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";

import "../styles/Navbar.css";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h1>CodexAI</h1>
        </div>
        <div className="nav-items">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? <LightbulbIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
