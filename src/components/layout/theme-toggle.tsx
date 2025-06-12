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
    <span className="flex items-center gap-x-1 text-xs mr-6">
      Themes [{theme}]
      <button type="button" onClick={handleNextTheme}>
        <ArrowUpDownIcon className="rotate-90 size-3" />
      </button>
    </span>
  );
};

export default ThemeToggle;
