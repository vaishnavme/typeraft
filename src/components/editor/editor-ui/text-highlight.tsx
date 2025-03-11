import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import { HighlighterIcon } from "lucide-react";

const highlight_colors: string[] = ["#00BFFF", "#DA70D6", "#FFA500", "#7da300"];

const TextHightlight = ({ editor }: { editor: Editor }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button type="button">
        <Button variant="ghost" size="icon" asChild>
          <div>
            <HighlighterIcon />
          </div>
        </Button>
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-48">
      <div className="flex items-center justify-between gap-4">
        {highlight_colors.map((color) => {
          const isActive = editor.isActive("highlight", { color });
          return (
            <button
              type="button"
              key={color}
              onClick={() => editor.commands.toggleHighlight({ color })}
            >
              <div
                className={`size-6 rounded-full ring-2 ring-offset-1 ${
                  isActive ? "ring-purple-500" : "ring-stone-200"
                }`}
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </div>
    </PopoverContent>
  </Popover>
);

export default TextHightlight;
