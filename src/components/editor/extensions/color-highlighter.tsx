import { Node } from "@tiptap/pm/model";
import { Plugin } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Extension } from "@tiptap/react";

// Also requires CSS. Added in global.css
const findColors = (doc: Node): DecorationSet => {
  const hexColor = /(#[0-9a-f]{3,6})\b/gi;
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(hexColor)).forEach((match) => {
      const color = match[0];
      const index = match.index || 0;
      const from = position + index;
      const to = from + color.length;
      const decoration = Decoration.inline(from, to, {
        class: "color",
        style: `--color: ${color}`,
      });

      decorations.push(decoration);
    });
  });

  return DecorationSet.create(doc, decorations);
};

const ColorHighlighter = Extension.create({
  name: "colorHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findColors(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findColors(transaction.doc)
              : oldState;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export default ColorHighlighter;
