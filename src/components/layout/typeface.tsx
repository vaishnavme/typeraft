import { useTheme, type Font } from "../../provider/theme-provider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import Text from "../ui/text";

type TypefaceType = {
  label: string;
  font: string;
};

const TYPEFACE_OPTIONS: TypefaceType[] = [
  {
    label: "Geist",
    font: "geist",
  },
  {
    label: "Geist Mono",
    font: "geist-mono",
  },
  {
    label: "IBM Plex Serif",
    font: "ibm-plex",
  },
];

const Typeface = () => {
  const { font, setFont } = useTheme();

  return (
    <div className="flex flex-col gap-y-1">
      <Text size="xs" weight="medium">
        Select Typeface
      </Text>
      <Select
        value={font}
        onValueChange={(nextFont: Font) => {
          setFont(nextFont);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Typeface" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Typeface</SelectLabel>
            {TYPEFACE_OPTIONS.map((font) => (
              <SelectItem key={font.label} value={font.font}>
                {font.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Typeface;
