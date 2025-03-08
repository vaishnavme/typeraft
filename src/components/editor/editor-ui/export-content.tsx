import { Editor } from "@tiptap/react";
import turndown from "turndown";
import {
  DownloadIcon,
  FileCodeIcon,
  FileDownIcon,
  FileTextIcon,
  FileTypeIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const export_actions = {
  text: "text",
  html: "html",
  markdown: "markdown",
  pdf: "pdf",
} as const;

const export_options = [
  {
    label: "Markdown",
    icon: <FileDownIcon />,
    action: export_actions.markdown,
  },
  // {
  //   label: "PDF",
  //   icon: <FileTextIcon />,
  //   action: export_actions.pdf,
  // },
  {
    label: "HTML",
    icon: <FileCodeIcon />,
    action: export_actions.html,
  },
  {
    label: "Text",
    icon: <FileTypeIcon />,
    action: export_actions.text,
  },
];

const downloadElement = ({
  fileName,
  blob,
}: {
  fileName: string;
  blob: Blob;
}) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const ExportContent = ({ editor }: { editor: Editor }) => {
  //
  const getFileName = (type = "") => {
    if (!type) return;
    return `${Date.now().toString()}.${type}`;
  };

  const downloadText = () => {
    const textContent = editor.getText();
    const fileName = getFileName("txt");

    if (!fileName || !textContent) return;

    const blob = new Blob([textContent], { type: "text/plain" });
    downloadElement({ fileName, blob });
  };

  const downloadHTML = () => {
    const htmlContent = editor.getHTML();
    const fileName = getFileName("html");

    if (!fileName || !htmlContent) return;

    const blob = new Blob([htmlContent], { type: "text/html" });
    downloadElement({ fileName, blob });
  };

  const downloadMarkdown = () => {
    const htmlContent = editor.getHTML();
    const fileName = getFileName("md");

    if (!fileName || !htmlContent) return;

    const turndownService = new turndown();

    const markdownContent = turndownService.turndown(htmlContent);
    console.log("markdownContent: ", markdownContent);
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    downloadElement({ fileName, blob });
  };

  const handleExportOption = (action: string) => {
    switch (action) {
      case export_actions.text:
        downloadText();
        break;

      case export_actions.html:
        downloadHTML();
        break;

      case export_actions.markdown:
        downloadMarkdown();
        break;

      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <Button variant="ghost" size="icon" asChild>
            <div className="whitespace-nowrap">
              <DownloadIcon />
            </div>
          </Button>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        {export_options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={() => handleExportOption(option.action)}
          >
            {option.icon} {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportContent;
