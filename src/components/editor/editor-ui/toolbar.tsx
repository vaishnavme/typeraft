import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  ClockIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MaximizeIcon,
  MinimizeIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import ThemeSwitch from "@/components/layout/theme-switch";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const basicToolbarOptions = [
  {
    label: "Bold",
    icon: <BoldIcon />,
    onClick: (editor: Editor) => editor.commands.toggleBold(),
  },
  {
    label: "Italic",
    icon: <ItalicIcon />,
    onClick: (editor: Editor) => editor.commands.toggleItalic(),
  },
  {
    label: "Underline",
    icon: <UnderlineIcon />,
    onClick: (editor: Editor) => editor.commands.toggleUnderline(),
  },
  {
    label: "Strike",
    icon: <StrikethroughIcon />,
    onClick: (editor: Editor) => editor.commands.toggleStrike(),
  },
];

const Toolbar = ({ editor }: { editor: Editor }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        toast(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    }
  };

  if (!editor) {
    return null;
  }

  const wordsCount = editor.storage.characterCount.words();
  const charactersCount = editor.storage.characterCount.characters();

  return (
    <div className="rounded-lg border">
      <div className="flex items-center justify-between gap-x-1 border-b p-2">
        <div className="flex items-center justify-between gap-x-1">
          {basicToolbarOptions.map((option) => (
            <Toggle key={option.label} onClick={() => option.onClick(editor)}>
              {option.icon}
            </Toggle>
          ))}
          <Toggle onClick={() => editor.commands.toggleOrderedList()}>
            <ListOrderedIcon />
          </Toggle>
          <Toggle onClick={() => editor.commands.toggleBulletList()}>
            <ListIcon />
          </Toggle>
        </div>

        <div className="flex items-center gap-x-1">
          <Button onClick={toggleFullScreen} variant="ghost" size="icon">
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
          <ThemeSwitch />
        </div>
      </div>

      <div className="p-2 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-x-2 text-xs">
          <p>
            <span className="font-medium">{wordsCount}</span> words
          </p>
          <p>
            <span className="font-medium">{charactersCount}</span> characters
          </p>
          <div className="flex items-center gap-x-1">
            <ClockIcon size={12} />
            <span className="font-medium">
              {Math.ceil(wordsCount / 200)}
            </span>{" "}
            min read
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
