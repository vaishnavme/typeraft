import { useTheme, type Font } from "../../theme/theme-provider";

const all_fonts = ["geist", "ibm-plex", "jetbrains-mono"];

const FontToggle = () => {
  const { font, setFont } = useTheme();

  const handleNextFont = () => {
    const currentIndex = all_fonts.indexOf(font);
    const nextIndex = (currentIndex + 1) % all_fonts.length;
    setFont(all_fonts[nextIndex] as Font);
  };

  return (
    <button
      type="button"
      onClick={handleNextFont}
      className="p-0.5 flex items-center gap-x-1 text-xxs select-none hover:opacity-100 opacity-70 transition-opacity duration-150 jetbrains-mono accent"
    >
      {font}
    </button>
  );
};

export default FontToggle;
