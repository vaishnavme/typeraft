import { useEffect, useMemo, useRef } from "react";
import * as fs from "@tauri-apps/plugin-fs";
import { toast } from "sonner";
import Editor, { type EditorRefType } from "../editor/editor";
import { debounce, htmlToMarkdown, markdownToHTML } from "../../lib/utils";
import useQueryParams from "../../hooks/useQueryParams";
import store from "../../lib/store";
import type { LookupCacheType } from "../../lib/global.types";

const Writer = () => {
  const editorRef = useRef<EditorRefType | null>(null);
  const { query, resetQuery, setQuery } = useQueryParams();

  const fileParamsId = query?.fileId;

  const updateLookupCache = async (fileId: string, textContent: string) => {
    if (!store.config.lookupPath) return;
    try {
      const lookupJSON = await fs.readTextFile(store.config.lookupPath);
      const parsed: LookupCacheType[] = JSON.parse(lookupJSON);

      const timestamp = new Date().toISOString();
      const preview = textContent?.trim()?.slice(0, 120);

      const fileIdIndex = parsed?.findIndex((item) => item?.fileId === fileId);

      if (fileIdIndex > -1) {
        parsed[fileIdIndex].updatedAt = timestamp;
        parsed[fileIdIndex].preview = preview;
      } else {
        parsed.push({
          fileId,
          preview,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
      await fs.writeTextFile(
        store.config.lookupPath,
        JSON.stringify(parsed, null, 2)
      );
    } catch (err) {
      toast.error(`Error occured while updating cache: ${err}`);
    }
  };

  const writeToFile = async (content: { markdown: string; text: string }) => {
    let fileId = fileParamsId;

    if (!fileId) {
      fileId = Date.now().toString();
    }

    if (fileId && !fileParamsId) {
      setQuery({ fileId });
    }

    try {
      const contentPath = `${store.config.stackPath}/${fileId}.md`;
      await fs.writeTextFile(contentPath, content.markdown);
      updateLookupCache(fileId, content.text);
    } catch (err) {
      toast.error(`Error occured while saving stack entry: ${err}`);
    }
  };

  const debouncedOnChange = useMemo(
    () =>
      debounce((userInput) => {
        const { html, text } = userInput as { html: string; text: string };
        const markdown = htmlToMarkdown(html);

        writeToFile({ markdown, text });
      }, 500),
    [fileParamsId]
  );

  const loadExistingFile = async () => {
    try {
      const contentPath = `${store.config.stackPath}/${fileParamsId}.md`;
      const content = await fs.readTextFile(contentPath);

      if (content) {
        const html = markdownToHTML(content);
        editorRef?.current?.setContent(html);
      }
    } catch (err) {
      toast.error(`Error occured while loading existing stack entry: ${err}`);
    }
  };

  useEffect(() => {
    if (query?.fileId) {
      loadExistingFile();
      return;
    }
    if (query?.entry === "new") {
      editorRef?.current?.clearContent?.();
      resetQuery();
    }
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto my-20 px-4 sm:px-8">
      <Editor
        ref={editorRef}
        onChange={(editorContent) => debouncedOnChange(editorContent)}
      />
    </div>
  );
};

export default Writer;
