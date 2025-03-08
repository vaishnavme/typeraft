import { EditorContent, useEditor } from "@tiptap/react";
import extensions from "./extensions";
import Toolbar from "./editor-ui/toolbar";
import { placeholder_content, typeraft_prose_styles } from "./constants";
import { useState } from "react";
import { fontStyles } from "./editor-ui/font-selector";

const Editor = () => {
  const [fontStyle, setFontStyle] = useState<string>(fontStyles.serif);

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor: editorInstance }) => {
      console.log(editorInstance.getHTML());
    },
    content: placeholder_content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: "typeraft",
        class: typeraft_prose_styles,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full space-y-10 mb-20">
      <Toolbar
        editor={editor}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
      />
      <div className={`${fontStyle} w-full`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
