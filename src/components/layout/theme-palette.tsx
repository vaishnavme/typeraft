import { useTheme, type Theme } from "../../provider/theme-provider";
import Text from "../ui/text";

type ThemeOptionType = {
  label: string;
  theme: Theme;
  color: string;
};

const THEMES_OPTIONS: ThemeOptionType[] = [
  {
    label: "Default",
    theme: "default",
    color: "default-theme-bg",
  },
  {
    label: "Cream",
    theme: "cream",
    color: "cream-theme-bg",
  },
  {
    label: "Mist",
    theme: "mist",
    color: "mist-theme-bg",
  },
  {
    label: "Sage",
    theme: "sage",
    color: "sage-theme-bg",
  },
  {
    label: "Lavender",
    theme: "lavender",
    color: "lavender-theme-bg",
  },
  {
    label: "Dark",
    theme: "dark",
    color: "dark-theme-bg",
  },
];

const ThemePalette = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-y-2">
      <Text size="default" weight="medium">
        Appearance
      </Text>
      <ul className="flex items-center gap-x-2">
        {THEMES_OPTIONS.map((option) => (
          <li key={option.theme}>
            <button
              type="button"
              aria-label={`Theme ${option.theme}`}
              onClick={() => setTheme(option.theme)}
              data-state={theme === option.theme ? "on" : "off"}
              className={`size-7 rounded-full border border-white data-[state=on]:ring-2 data-[state=on]:ring-ring ${option.color}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

ThemePalette.displayName = "ThemePalette";

export default ThemePalette;
