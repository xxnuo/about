import { FiSun, FiMoon } from "react-icons/fi";

export interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-1 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  );
}; 