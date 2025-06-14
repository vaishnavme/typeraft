import { useTheme, type Theme } from "../../theme/theme-provider";
import { ArrowUpDownIcon } from "../icons";

const all_themes = [
  "paper",
  "cream",
  "mist",
  "sage",
  "lavender",
  "rose",
  "ink",
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleNextTheme = () => {
    const currentIndex = all_themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % all_themes.length;
    setTheme(all_themes[nextIndex] as Theme);
  };

  return (
    <button
      type="button"
      onClick={handleNextTheme}
      className="p-0.5 flex items-center gap-x-1 text-xxs select-none hover:opacity-100 opacity-70 transition-opacity duration-150 jetbrains-mono accent"
    >
      themes [{theme}]<ArrowUpDownIcon className="rotate-90 size-3" />
    </button>
  );
};

export default ThemeToggle;
