import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import ColorHighlighter from "./ColorHighlighter";
import Codeblock from "./Codeblock";

const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  Underline,
  CharacterCount,
  Typography,
  Link,
  Highlight.configure({ multicolor: true }),
  ColorHighlighter,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Codeblock,
];

export default extensions;
