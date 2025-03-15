import { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CheckIcon,
} from "lucide-react";
import Tooltip from "@/components/ui/tooltip";

const alignOptions = ["left", "right", "center"] as const;

const TEXT_ALIGN_ICONS = {
  left: <AlignLeftIcon />,
  center: <AlignCenterIcon />,
  right: <AlignRightIcon />,
  justify: <AlignJustifyIcon />,
};

const textAlignOptions = [
  {
    label: "Left",
    value: "left",
    icon: TEXT_ALIGN_ICONS.left,
  },
  {
    label: "Center",
    value: "center",
    icon: TEXT_ALIGN_ICONS.center,
  },
  {
    label: "Right",
    value: "right",
    icon: TEXT_ALIGN_ICONS.right,
  },
  {
    label: "Justify",
    value: "justify",
    icon: TEXT_ALIGN_ICONS.justify,
  },
];

const TextAlignSelector = ({ editor }: { editor: Editor }) => {
  const activeAlignment = alignOptions.find((option) =>
    editor.isActive({ textAlign: option })
  );

  const activeAlignmentIcon = activeAlignment
    ? TEXT_ALIGN_ICONS[activeAlignment]
    : TEXT_ALIGN_ICONS.left;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Button
            variant="ghost"
            size="icon"
            asChild
            data-tooltip-id="text-align"
            data-tooltip-content="Text Alignment"
          >
            <div>{activeAlignmentIcon}</div>
          </Button>
          <Tooltip id="text-align" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-28">
        {textAlignOptions.map((option) => (
          <DropdownMenuItem
            key={option.label}
            className="flex items-center gap-x-2 justify-between"
            onClick={() =>
              editor.chain().focus().setTextAlign(option.value).run()
            }
          >
            <div className="flex items-center gap-x-2">
              {option.icon} {option.label}
            </div>
            {editor.isActive({ textAlign: option.value }) ? (
              <CheckIcon />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextAlignSelector;
