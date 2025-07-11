import { useImperativeHandle, forwardRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { getRandomNumber } from "../../lib/utils";
import { useTheme } from "../../provider/theme-provider";
import { font_class_map } from "../../lib/constants";

export interface EditorRefType {
  setContent: (html: string) => void;
  clearContent?: () => void;
}

interface EditorProps {
  content?: string;
  onChange: ({ html, text }: { html: string; text: string }) => void;
}

const allPlaceholders = [
  "Type your first thought!",
  "What's on your mind!",
  "Write your thought!",
];

const getPlaceholder = () =>
  allPlaceholders[getRandomNumber(0, allPlaceholders.length - 1)];

const Editor = forwardRef<EditorRefType, EditorProps>((props, ref) => {
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
          openOnClick: true,
        }),
        Placeholder.configure({
          placeholder: getPlaceholder(),
        }),
      ],
      onUpdate: ({ editor: editorInstance }) => {
        const html = editorInstance.getHTML();
        const text = editorInstance.getText();

        onChange({ html, text });
      },

      editorProps: {
        attributes: {
          class: `prose outline-none w-full h-full ${font_class_map[font]}`,
        },
      },
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      setContent: (content: string) => {
        editor?.commands?.setContent(content);
      },
      clearContent: () => {
        editor?.commands?.clearContent();
      },
    }),
    []
  );

  return <EditorContent editor={editor} />;
});

export default Editor;
