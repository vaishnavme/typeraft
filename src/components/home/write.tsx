import { useState } from "react";
import Editor from "../editor/editor";
import ThemeToggle from "../layout/theme-toggle";

const Write = () => {
  const [content, setContent] = useState<string>("sadas");

  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full max-w-3xl mx-auto py-10">
        <Editor content={content} onChange={(text) => setContent(text)} />
      </div>
      <footer className="absolute bottom-0 right-0 text-xs font-medium p-1">
        <ThemeToggle />
      </footer>
    </div>
  );
};

export default Write;
