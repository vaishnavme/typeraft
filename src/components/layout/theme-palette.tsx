import { Button } from "../ui/button";
import { useTheme, type Theme } from "../../provider/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ThemePalette = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Theme Pallet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme Pallet</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(appTheme) => setTheme(appTheme as Theme)}
        >
          <DropdownMenuRadioItem value="default">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cream">Cream</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lavender">
            Lavender
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="mist">Mist</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sage">Sage</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rose">Rose</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ThemePalette.displayName = "ThemePalette";

export default ThemePalette;
