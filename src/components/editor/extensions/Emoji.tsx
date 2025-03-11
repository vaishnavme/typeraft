import { mergeAttributes, Node } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion from "@tiptap/suggestion";
import { SearchIndex as emojiSearch, init as emojiDataInit } from "emoji-mart";
import emojiData from "@emoji-mart/data";
import tippySuggestion from "../editor-utils";
import { forwardRef } from "react";
import SuggestionMenu from "../editor-ui/suggestion-menu";
import { EmojiProps } from "emoji-mart";

emojiDataInit({ data: emojiData });

const EmojiPluginKey = new PluginKey("emoji");

const EmojiNode = Node.create({
  name: "emoji",
  priority: 101,
  group: "inline",
  inline: true,
  selectable: false,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      deleteTriggerWithBackspace: false,

      renderText: ({ node }) => `${node.attrs.icon ?? node.attrs.label}`,

      renderHTML: ({ options, node }) => [
        "span",
        mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
        `${node.attrs.icon ?? node.attrs.label}`,
      ],

      suggestion: {
        char: ":",
        pluginKey: EmojiPluginKey,

        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor?.view?.state?.selection?.$to?.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(" ");

          if (overrideSpace) {
            // eslint-disable-next-line no-param-reassign
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();

          // get reference to `window` object from editor element, to support cross-frame JS usage
          editor.view.dom.ownerDocument.defaultView
            ?.getSelection()
            ?.collapseToEnd();
        },

        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  addAttributes() {
    return {
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),

        renderHTML: (attributes) => {
          if (!attributes?.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
      icon: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-icon"),

        renderHTML: (attributes) => {
          if (!attributes.icon) {
            return {};
          }

          return {
            "data-icon": attributes.icon,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    if (this.options.renderLabel !== undefined) {
      return [
        "span",
        mergeAttributes(
          { "data-type": this.name },
          this.options.HTMLAttributes,
          HTMLAttributes
        ),
        this.options.renderLabel({
          options: this.options,
          node,
        }),
      ];
    }
    const mergedOptions = { ...this.options };

    mergedOptions.HTMLAttributes = mergeAttributes(
      { "data-type": this.name },
      this.options.HTMLAttributes,
      HTMLAttributes
    );
    const html = this.options.renderHTML({
      options: mergedOptions,
      node,
    });

    if (typeof html === "string") {
      return [
        "span",
        mergeAttributes(
          { role: "img" },
          this.options.HTMLAttributes,
          HTMLAttributes
        ),
        html,
      ];
    }
    return html;
  },

  renderText({ node }) {
    if (this.options.renderLabel !== undefined) {
      return this.options.renderLabel({
        options: this.options,
        node,
      });
    }
    return this.options.renderText({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText(
                this.options.deleteTriggerWithBackspace
                  ? ""
                  : this.options.suggestion.char || "",
                pos,
                pos + node.nodeSize
              );

              return false;
            }
          });

          return isMention;
        }),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const EmojiList = forwardRef((props, ref) => {
  const { items, command } = props;

  const onOptionSelect = (option: EmojiProps) => {
    if (!option) return;

    command(option);
  };

  const renderOptionComponent = ({ option }: { option: EmojiProps }) => {
    if (!option?.icon || !option?.shortcode) return null;

    return (
      <div className="truncate">
        <span className="text-base">{option.icon}</span>{" "}
        <span className="ml-2">{option.label}</span>
      </div>
    );
  };

  return (
    <SuggestionMenu
      ref={ref}
      suggestionOptions={items}
      onOptionSelect={onOptionSelect}
      renderOptionComponent={renderOptionComponent}
    />
  );
});

EmojiList.displayName = "EmojiList";

const Emoji = EmojiNode.configure({
  suggestion: {
    items: async ({ query }: { query: string }) => {
      const response = await emojiSearch.search(query);

      if (!response?.length) return [];

      return response
        ?.map((emoji: EmojiProps) => ({
          id: emoji.id,
          label: emoji?.name,
          icon: emoji.skins[0].native,
          shortcode: emoji.skins[0].shortcodes,
        }))
        ?.slice(0, 15);
    },

    render: () => tippySuggestion(EmojiList),
  },
});

export default Emoji;
