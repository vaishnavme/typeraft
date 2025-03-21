import { Editor } from "@tiptap/react";
import {
  CheckIcon,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  PilcrowIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Tooltip from "@/components/ui/tooltip";

const BLOCK_ICONS = {
  paragraph: <PilcrowIcon />,
  1: <Heading1Icon />,
  2: <Heading2Icon />,
  3: <Heading3Icon />,
};

const blockTypeOptions = [
  {
    label: "Paragraph",
    value: "paragraph",
    icon: BLOCK_ICONS.paragraph,
    onClick: (editor: Editor) => editor.commands.setParagraph(),
  },
  {
    label: "Heading 1",
    value: 1,
    icon: BLOCK_ICONS[1],
    onClick: (editor: Editor) => editor.commands.toggleHeading({ level: 1 }),
  },
  {
    label: "Heading 2",
    value: 2,
    icon: BLOCK_ICONS[2],
    onClick: (editor: Editor) => editor.commands.toggleHeading({ level: 2 }),
  },
  {
    label: "Heading 3",
    value: 3,
    icon: BLOCK_ICONS[3],
    onClick: (editor: Editor) => editor.commands.toggleHeading({ level: 3 }),
  },
];

const levels = [1, 2, 3] as const;

const BlockSelector = ({ editor }: { editor: Editor }) => {
  const activeHeading = levels.find((level) =>
    editor?.isActive("heading", { level })
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Button
            variant="outline"
            asChild
            data-tooltip-id="block-elements"
            data-tooltip-content="Heading Block"
          >
            <div>
              {activeHeading
                ? BLOCK_ICONS[activeHeading]
                : BLOCK_ICONS.paragraph}
              <ChevronDownIcon />
            </div>
          </Button>
          <Tooltip id="block-elements" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {blockTypeOptions.map((option) => {
          const isChecked = activeHeading
            ? activeHeading === option.value
            : option.value === "paragraph";
          return (
            <DropdownMenuItem
              key={option.label}
              onClick={() => option.onClick(editor)}
            >
              {option.icon}
              {option.label}
              {isChecked ? <CheckIcon /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlockSelector;
