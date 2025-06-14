import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useTheme } from "../../theme/theme-provider";
import { getRandomNumber } from "../../lib/utils";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const allPlaceholders = [
  "Type your first thought!",
  "What's on your mind!",
  "Write your thought!",
];

const getPlaceholder = () =>
  allPlaceholders[getRandomNumber(0, allPlaceholders.length - 1)];

const Editor = (props: EditorProps) => {
  const { content, onChange } = props;

  const { font } = useTheme();

  const editor = useEditor(
    {
      content,
      autofocus: true,
      extensions: [
        StarterKit,
        Link.configure({
          autolink: true,
          linkOnPaste: true,
        }),
        Placeholder.configure({
          placeholder: getPlaceholder(),
        }),
      ],
      onUpdate: ({ editor: editorInstance }) => {
        onChange(editorInstance.getHTML());
      },

      editorProps: {
        attributes: {
          class: `prose outline-none w-full h-full ${font}`,
        },
      },
    },
    []
  );

  return <EditorContent editor={editor} />;
};

export default Editor;
