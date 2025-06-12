import Placeholder from "@tiptap/extension-placeholder";
import { getRandomNumber } from "../../lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

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

  const editor = useEditor(
    {
      content,
      autofocus: true,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: getPlaceholder(),
        }),
      ],
      onUpdate: ({ editor: editorInstance }) => {
        onChange(editorInstance.getHTML());
      },

      editorProps: {
        attributes: {
          class: "prose outline-none",
        },
      },
    },
    []
  );

  return <EditorContent editor={editor} />;
};

export default Editor;
