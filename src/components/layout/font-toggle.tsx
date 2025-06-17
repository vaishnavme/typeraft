import { useTheme, type Font } from "../../theme/theme-provider";
import Button from "../ui/button";

const all_fonts = ["geist", "ibm-plex", "mono"];

const FontToggle = () => {
  const { font, setFont } = useTheme();

  const handleNextFont = () => {
    const currentIndex = all_fonts.indexOf(font);
    const nextIndex = (currentIndex + 1) % all_fonts.length;
    setFont(all_fonts[nextIndex] as Font);
  };

  return <Button.MonoButton onClick={handleNextFont}>{font}</Button.MonoButton>;
};

export default FontToggle;
