/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editor, ReactRenderer } from "@tiptap/react";
import { SuggestionProps } from "@tiptap/suggestion";
import {
  ComponentClass,
  ForwardRefExoticComponent,
  FunctionComponent,
  RefAttributes,
} from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";

const tippySuggestion = (
  SuggestionComponent:
    | ComponentClass<object, unknown>
    | FunctionComponent<object>
    | ForwardRefExoticComponent<object & RefAttributes<unknown>>
) => {
  let popup: TippyInstance[];
  let component: ReactRenderer;

  return {
    onStart: (props: { clientRect: unknown; editor: Editor }) => {
      const { editor: editorInstance } = props;

      component = new ReactRenderer(SuggestionComponent, {
        props,
        editor: editorInstance,
      });

      if (!props.clientRect) {
        return;
      }

      // @ts-expect-error
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "auto-start",
        arrow: false,
      });
    },

    onUpdate(props: SuggestionProps) {
      component.updateProps(props);

      popup[0].setProps({
        getReferenceClientRect: props.clientRect as () => DOMRect,
      });
    },

    // @ts-expect-error
    onKeyDown(props) {
      if (props.event.key === "Escape") {
        popup[0].hide();

        return true;
      }

      // @ts-expect-error
      return component.ref?.onKeyDown(props);
    },

    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};

export default tippySuggestion;
