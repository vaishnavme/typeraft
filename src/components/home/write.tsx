import { useState } from "react";
import Editor from "../editor/editor";
import { debounce } from "../../lib/utils";

const Write = () => {
  const [content, setContent] = useState<string>("");

  const onChange = (userInput: string) => {
    setContent(userInput);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-20">
      <Editor onChange={(text) => debounce(() => onChange(text), 500)} />
    </div>
  );
};

export default Write;
