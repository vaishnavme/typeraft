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
import FontSelector from "./font-selector";
import ExportContent from "./export-content";
import TextHightlight from "./text-highlight";
import AttachIframe from "./attach-iframe";
import Tooltip from "@/components/ui/tooltip";

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

const BasicTools = ({ editor }: { editor: Editor }) =>
  basicToolbarOptions.map((option) => (
    <div key={option.label}>
      <Toggle
        onClick={() => option.onClick(editor)}
        pressed={editor.isActive(option.value)}
        data-tooltip-id={option.value}
        data-tooltip-content={option.label}
      >
        {option.icon}
      </Toggle>
      <Tooltip id={option.value} />
    </div>
  ));

const List = ({ editor }: { editor: Editor }) => (
  <>
    <Toggle
      onClick={() => editor.commands.toggleBulletList()}
      pressed={editor.isActive("bulletList")}
      data-tooltip-id="bullet-list"
      data-tooltip-content="Bullet List"
    >
      <ListIcon />
    </Toggle>
    <Toggle
      onClick={() => editor.commands.toggleOrderedList()}
      pressed={editor.isActive("orderedList")}
      data-tooltip-id="ordered-list"
      data-tooltip-content="Ordered List"
    >
      <ListOrderedIcon />
    </Toggle>
    <Tooltip id="bullet-list" />
    <Tooltip id="ordered-list" />
  </>
);

const MoodSetup = ({ editor }: { editor: Editor }) => {
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

  return (
    <div className="flex items-center gap-1">
      <ExportContent editor={editor} />
      <Button
        onClick={toggleFullScreen}
        variant="ghost"
        size="icon"
        data-tooltip-id="full-screen"
        data-tooltip-content={isFullScreen ? "Minimize Screen" : "Focus mode"}
      >
        {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
      </Button>
      <ThemeSwitch />
      <Tooltip id="full-screen" />
    </div>
  );
};
const Toolbar = ({
  editor,
  fontStyle,
  setFontStyle,
}: {
  editor: Editor;
  fontStyle: string;
  setFontStyle: (fontStyle: string) => void;
}) => {
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
            data-tooltip-id="blockquote"
            data-tooltip-content="Blockquote"
            pressed={editor.isActive("blockquote")}
            onClick={() => editor.commands.toggleBlockquote()}
          >
            <QuoteIcon />
          </Toggle>
          <Tooltip id="blockquote" />
          <TextAlignSelector editor={editor} />
          <Toggle
            data-tooltip-id="codeblock"
            data-tooltip-content="Codeblock"
            pressed={editor.isActive("codeblock")}
            onClick={() => editor.commands.toggleCodeBlock()}
          >
            <CodeIcon />
          </Toggle>
          <Tooltip id="codeblock" />
          <Seperator />
          <TextHightlight editor={editor} />
          <AttachIframe editor={editor} />

          <div className="block sm:hidden">
            <MoodSetup editor={editor} />
          </div>
        </div>

        <div className="hidden sm:block">
          <MoodSetup editor={editor} />
        </div>
      </div>

      <div className="p-2 flex items-center justify-between flex-wrap gap-4">
        <div>
          <FontSelector fontStyle={fontStyle} setFontStyle={setFontStyle} />
        </div>
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
