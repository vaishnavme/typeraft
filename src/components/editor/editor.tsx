import { EditorContent, useEditor } from "@tiptap/react";
import extensions from "./extensions";
import Toolbar from "./editor-ui/toolbar";
import { placeholder_content, typeraft_prose_styles } from "./constants";

const Editor = () => {
  const editor = useEditor({
    extensions,
    onUpdate: ({ editor: editorInstance }) => {
      console.log(editorInstance.getHTML());
    },
    content: placeholder_content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: typeraft_prose_styles,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full space-y-20 mb-20">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
