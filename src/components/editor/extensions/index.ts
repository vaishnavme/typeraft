import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";

const extensions = [
  StarterKit,
  Underline,
  CharacterCount,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export default extensions;
