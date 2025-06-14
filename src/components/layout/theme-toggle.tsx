import { useTheme, type Theme } from "../../theme/theme-provider";
import { ArrowUpDownIcon } from "../icons";
import Button from "../ui/button";

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
    <Button.MonoButton onClick={handleNextTheme}>
      themes [{theme}]<ArrowUpDownIcon className="rotate-90 size-3" />
    </Button.MonoButton>
  );
};

export default ThemeToggle;
