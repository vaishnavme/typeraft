import { useEffect, useState } from "react";
import { FolderOpenIcon } from "lucide-react";
import * as fs from "@tauri-apps/plugin-fs";
import dayjs from "dayjs";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import type { LookupCacheType } from "../../lib/global.types";
import store from "../../lib/store";
import useQueryParams from "../../hooks/useQueryParams";

const SidePanel = () => {
  const { query, setQuery } = useQueryParams();

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [allEntries, setAllEntries] = useState<LookupCacheType[]>([]);

  const loadAllEntries = async () => {
    if (!store.config.lookupPath) return;
    try {
      const isFileExist = await fs.exists(store.config.lookupPath);
      if (!isFileExist) return;
      const lookupJSON = await fs.readTextFile(store.config.lookupPath);
      const parsed: LookupCacheType[] = JSON.parse(lookupJSON);
      const sortedList = parsed?.sort(
        (f1, f2) =>
          new Date(f2.createdAt).getTime() - new Date(f1.createdAt).getTime()
      );
      setAllEntries(sortedList || []);
    } catch (err) {
      toast.error(`Error occured while loading all stack entries: ${err}`);
    }
  };

  useEffect(() => {
    loadAllEntries();
  }, [openPanel, store.config.lookupPath]);

  return (
    <Sheet open={openPanel} onOpenChange={setOpenPanel}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 flex items-center justify-center rounded hover:bg-background hover:text-primary"
        >
          <FolderOpenIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 mt-1.5 mr-1.5 h-[calc(100%-12px)] rounded border border-border">
        <SheetHeader>
          <SheetTitle className="font-medium">All Entries</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100%-72px)] overflow-y-auto">
          <ul className="space-y-0.5">
            {allEntries.map((entry) => (
              <li key={entry.fileId}>
                <button
                  type="button"
                  data-state={entry?.fileId === query?.fileId ? "on" : "off"}
                  onClick={() => setQuery({ fileId: entry?.fileId })}
                  className="text-xs text-left w-full px-4 py-2 border-l-2 border-background data-[state=on]:border-primary data-[state=on]:bg-muted hover:bg-muted"
                >
                  <p className="clamp-2 mb-1">{entry.preview}</p>

                  <div className="flex items-center justify-end text-[10px] font-mono">
                    {dayjs(entry.createdAt).format("DD MMM, YYYY")}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;
