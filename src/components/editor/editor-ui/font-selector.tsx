import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon } from "lucide-react";

export const fontStyles = {
  sans: "font-sans",
  mono: "font-mono",
  serif: "font-serif",
} as const;

const fontStyleOptions = [
  {
    label: "Geist sans",
    value: fontStyles.sans,
  },
  {
    label: "Geist mono",
    value: fontStyles.mono,
  },
  {
    label: "IBM Plex Serif",
    value: fontStyles.serif,
  },
];

const FontSelector = ({
  fontStyle,
  setFontStyle,
}: {
  fontStyle: string;
  setFontStyle: (fontStyle: string) => void;
}) => {
  const activeFont = fontStyleOptions.find(
    (option) => option.value === fontStyle
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Button variant="outline" size="sm" asChild>
            <div className="whitespace-nowrap">{activeFont?.label}</div>
          </Button>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        {fontStyleOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="flex items-center gap-x-2 justify-between"
            onClick={() => setFontStyle(option.value)}
          >
            <div className="flex items-center gap-x-2">{option.label}</div>
            {option.value === fontStyle ? <CheckIcon /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSelector;
