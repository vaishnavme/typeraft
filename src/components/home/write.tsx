import { useState } from "react";
import Editor from "../editor/editor";

const Write = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div className="w-full max-w-2xl mx-auto py-20">
      <Editor content={content} onChange={(text) => setContent(text)} />
    </div>
  );
};

export default Write;
