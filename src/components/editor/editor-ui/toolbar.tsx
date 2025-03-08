import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  BoldIcon,
  ClockIcon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MaximizeIcon,
  MinimizeIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import ThemeSwitch from "@/components/layout/theme-switch";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BlockSelector from "./block-selector";
import TextAlignSelector from "./text-align";

interface ToolbarProps {
  editor: Editor;
}

const Seperator = () => <div className="h-6 w-px bg-border" />;

const basicToolbarOptions = [
  {
    label: "Bold",
    value: "bold",
    icon: <BoldIcon />,
    onClick: (editor: Editor) => editor.commands.toggleBold(),
  },
  {
    label: "Italic",
    value: "italic",
    icon: <ItalicIcon />,
    onClick: (editor: Editor) => editor.commands.toggleItalic(),
  },
  {
    label: "Underline",
    value: "underline",
    icon: <UnderlineIcon />,
    onClick: (editor: Editor) => editor.commands.toggleUnderline(),
  },
  {
    label: "Strike",
    value: "strike",
    icon: <StrikethroughIcon />,
    onClick: (editor: Editor) => editor.commands.toggleStrike(),
  },
];

const BasicTools = (props: ToolbarProps) => {
  const { editor } = props;

  return (
    <>
      {basicToolbarOptions.map((option) => (
        <Toggle
          key={option.label}
          onClick={() => option.onClick(editor)}
          pressed={editor.isActive(option.value)}
        >
          {option.icon}
        </Toggle>
      ))}
    </>
  );
};

const List = (props: ToolbarProps) => {
  const { editor } = props;

  return (
    <>
      <Toggle
        onClick={() => editor.commands.toggleBulletList()}
        pressed={editor.isActive("bulletList")}
      >
        <ListIcon />
      </Toggle>
      <Toggle
        onClick={() => editor.commands.toggleOrderedList()}
        pressed={editor.isActive("orderedList")}
      >
        <ListOrderedIcon />
      </Toggle>
    </>
  );
};

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props;

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
    <div className="rounded-xl border">
      <div className="flex items-center justify-between flex-wrap gap-1 border-b p-2">
        <div className="flex items-center gap-1 flex-wrap">
          <BlockSelector editor={editor} />
          <Seperator />
          <BasicTools editor={editor} />
          <Seperator />
          <List editor={editor} />
          <Seperator />
          <Toggle
            onClick={() => editor.commands.toggleBlockquote()}
            pressed={editor.isActive("blockquote")}
          >
            <QuoteIcon />
          </Toggle>
          <TextAlignSelector editor={editor} />
          <Toggle
            onClick={() => editor.commands.toggleCodeBlock()}
            pressed={editor.isActive("codeblock")}
          >
            <CodeIcon />
          </Toggle>
        </div>

        <div className="flex items-center gap-1">
          <Button onClick={toggleFullScreen} variant="ghost" size="icon">
            {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
          <ThemeSwitch />
        </div>
      </div>

      <div className="px-2 py-4 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-x-2 text-xs">
          <p>
            <span className="font-medium">{wordsCount}</span> words
          </p>
          <p>
            <span className="font-medium">{charactersCount}</span> characters
          </p>
          <div className="flex items-center gap-1">
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
