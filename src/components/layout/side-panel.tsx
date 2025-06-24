import { useEffect, useState } from "react";
import * as fs from "@tauri-apps/plugin-fs";
import dayjs from "dayjs";
import Button from "../ui/button";
import useQueryParams from "../../hooks/useQueryParams";
import store, { storeKeys } from "../../lib/store";
import type { LookupCacheType } from "../../lib/global.types";

interface SidePanelProps {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const SidePanel = (props: SidePanelProps) => {
  const { showDrawer, setShowDrawer } = props;

  const { query, setQuery } = useQueryParams();

  const [allEntries, setAllEntries] = useState<LookupCacheType[]>([]);

  const loadAllEntries = async () => {
    try {
      const lookupCachePath = await store.getItem(storeKeys.lookupPath);
      const lookupJSON = await fs.readTextFile(lookupCachePath);
      const parsed = JSON.parse(lookupJSON);
      setAllEntries(parsed);
    } catch {
      //
    }
  };

  useEffect(() => {
    loadAllEntries();
  }, [showDrawer]);

  return (
    <aside
      className={`fixed top-0 right-0 h-screen rounded-r-2xl w-72 bg-background border-l border-r-6 border-y-6 border-border shadow-lg z-40 transform transition-transform ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full flex items-center justify-between p-4">
        <p className="geist text-sm font-medium">All Entries</p>
        <Button.MonoButton onClick={() => setShowDrawer(false)}>
          close ✕
        </Button.MonoButton>
      </div>

      <ul className="space-y-px">
        {allEntries.map((entry) => (
          <li key={entry?.fileId}>
            <button
              type="button"
              data-state={entry?.fileId === query?.fileId ? "on" : "off"}
              onClick={() => {
                setQuery({ fileId: entry?.fileId });
              }}
              className="text-xs text-left w-full px-4 py-2 border-l-2 border-background data-[state=on]:border-accent data-[state=on]:bg-background-secondary hover:border-background-secondary hover:bg-background-secondary"
            >
              <div className="h-4">
                <p className="clamp-1 mb-1">{entry?.preview}</p>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-xxs font-medium mono text-secondary">
                  {dayjs(entry.createdAt).format("DD MMM, YYYY")}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidePanel;
