import { useEffect, useMemo, useRef } from "react";
import * as fs from "@tauri-apps/plugin-fs";
import { toast } from "sonner";
import Editor from "../editor/editor";
import { debounce, htmlToMarkdown, markdownToHTML } from "../../lib/utils";
import useQueryParams from "../../hooks/useQueryParams";
import store, { storeKeys } from "../../lib/store";
import type { LookupCacheType } from "../../lib/global.types";

const Write = () => {
  const editorRef = useRef<any>(null);
  const { query, resetQuery, setQuery } = useQueryParams();

  const fileParamsId = query?.fileId;

  const updateLookupCache = async (fileId: string, text: string) => {
    try {
      const lookupCachePath = await store.getItem(storeKeys.lookupPath);
      const lookupJSON = await fs.readTextFile(lookupCachePath);
      const parsed: LookupCacheType[] = JSON.parse(lookupJSON);

      const timestamp = new Date().toISOString();
      const preview = text?.trim()?.slice(0, 120);

      const fileIdIndex = parsed?.findIndex((item) => item?.fileId === fileId); // Fixed: was missing === fileId
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
      await fs.writeTextFile(lookupCachePath, JSON.stringify(parsed, null, 2));
    } catch {
      //
    }
  };

  const writeToFile = async ({
    markdown,
    text,
  }: {
    markdown: string;
    text: string;
  }) => {
    let fileId = fileParamsId;
    if (!fileId) {
      fileId = Date.now().toString();
    }

    if (fileId && !fileParamsId) {
      setQuery({ fileId });
    }

    try {
      const stackPath = await store.getItem(storeKeys.currentStackPath);
      const contentPath = `${stackPath}/${fileId}.md`;
      await fs.writeTextFile(contentPath, markdown);
      updateLookupCache(fileId, text);
    } catch {
      toast.message("Error occured while saving Writeup.");
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
      const stackPath = await store.getItem(storeKeys.currentStackPath);
      const contentPath = `${stackPath}/${fileParamsId}.md`;
      const content = await fs.readTextFile(contentPath);

      if (content) {
        const html = markdownToHTML(content);
        editorRef?.current?.setContent(html);
      }
    } catch {
      toast.message("Could not load existing note.");
    }
  };

  useEffect(() => {
    if (query?.fileId) {
      loadExistingFile();
      return;
    }
    if (query?.entry === "new") {
      editorRef?.current?.clearContent();
      resetQuery();
    }
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto py-20">
      <Editor ref={editorRef} onChange={(data) => debouncedOnChange(data)} />
    </div>
  );
};

export default Write;
