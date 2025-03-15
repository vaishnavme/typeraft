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

export const tippySuggestion = (
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

const allowed_urls = [
  "youtube.com",
  "loom.com",
  "codesandbox.io",
  "vimeo.com",
  "codepen.io",
];

const getEmbedType = (url: string) => {
  const hostname = new URL(url.replace("www.", "")).hostname;

  if (["youtu.be", "youtube.com"].includes(hostname)) {
    return "youtube.com";
  }

  return hostname;
};

export const isAllowedURL = (url: string) => {
  const hostname = getEmbedType(url);

  if (!allowed_urls.includes(hostname)) {
    return false;
  }

  return true;
};

export const getEmbedURL = (url: string) => {
  if (!url) {
    throw new Error("Invalid URL");
  }

  const embedType = getEmbedType(url);
  console.log("embedType: ", embedType);
  switch (embedType) {
    case "youtube.com": {
      if (url.includes("embed")) {
        return url;
      }

      if (url.includes("playlist")) {
        return "Currently playlist embed are not supported. Please add video url.";
      }

      const youTubeRegex =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
      const parsed = url.match(youTubeRegex);
      const videoId = parsed?.[1] || null;

      if (!videoId) {
        throw new Error(
          "Could not find youtube videoId. Please add valid youtube url"
        );
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }

    case "loom.com": {
      if (!url.includes("share") && !url.includes("embed")) {
        throw new Error(
          "Could not find loom videoId. Please add valid loom url."
        );
      }

      const loomId = url.includes("embed")
        ? url.split("/embed/")[1]
        : url.split("/share/")[1];

      return `https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true.`;
    }

    case "vimeo.com": {
      const videoId = url.split("/").pop();

      if (!videoId) {
        throw new Error(
          "Could not find vimeo videoId. Please add valid vimeo url."
        );
      }

      return `https://player.vimeo.com/video/${videoId}`;
    }

    case "codesandbox.io": {
      if (!url.includes("embed")) {
        throw new Error(
          "Please use codesanbox embed url. Please visit: https://codesandbox.io/docs/learn/sandboxes/embedding"
        );
      }

      return url;
    }

    case "codepen.io": {
      if (url.includes("embed")) {
        return url;
      }

      const match = url.match(/codepen\.io\/([^\/]+)\/pen\/([^\/]+)/);

      const author_name = match?.[1];
      const embed_id = match?.[2];

      if (!author_name || !embed_id) {
        throw new Error("Could not generate codepen embed url.");
      }

      return `https://codepen.io/${author_name}/embed/preview/${embed_id}`;
    }

    default:
      throw new Error("Could not generate embed url");
  }
};
