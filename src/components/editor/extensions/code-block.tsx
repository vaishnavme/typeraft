import { useRef, useState } from "react";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  NodeViewProps,
} from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyCheckIcon,
  CopyIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const lowlight = createLowlight(all);

const CodeBlockNode = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: NodeViewProps) => {
  const codeblockRef = useRef<HTMLPreElement | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    const codeBlockNode = codeblockRef?.current;

    if (codeBlockNode?.textContent) {
      setIsCopied(true);
      await navigator.clipboard.writeText(codeBlockNode.textContent);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  const allCodeLanguages = extension.options.lowlight.listLanguages();

  let codeLanguages = allCodeLanguages;
  if (query.length) {
    codeLanguages = allCodeLanguages.filter((lang: string) =>
      lang?.includes(query?.toLowerCase())
    );
  }

  return (
    <NodeViewWrapper className="code-block relative">
      <div className="absolute top-2 right-4 font-sans">
        <div className="flex items-center gap-x-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            {isCopied ? (
              <CopyCheckIcon className="text-green-500" />
            ) : (
              <CopyIcon />
            )}
          </Button>
          <DropdownMenu onOpenChange={() => setQuery("")}>
            <DropdownMenuTrigger>
              <button type="button">
                <Button variant="outline" size="sm" asChild>
                  <div className="whitespace-nowrap">
                    {defaultLanguage || "auto"}
                    <ChevronDownIcon />
                  </div>
                </Button>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-80 overflow-y-auto"
            >
              <Input
                className="mb-1"
                placeholder="Search"
                onKeyDown={(e) => e.stopPropagation()}
                onChange={(e) => setQuery(e?.target?.value)}
              />
              {codeLanguages.map((lang: string) => (
                <DropdownMenuItem
                  key={lang}
                  className="px-4 flex items-center justify-between"
                  tabIndex={0}
                  onClick={() => updateAttributes({ language: lang })}
                >
                  {lang}
                  {defaultLanguage === lang ? <CheckIcon /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <pre ref={codeblockRef} className="font-mono">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

const Codeblock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNode);
  },
}).configure({
  lowlight,
});

export default Codeblock;
