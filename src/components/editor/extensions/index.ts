import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import ColorHighlighter from "./ColorHighlighter";

const extensions = [
  StarterKit,
  Underline,
  CharacterCount,
  Typography,
  Link,
  ColorHighlighter,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export default extensions;
