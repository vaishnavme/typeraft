import * as fs from "@tauri-apps/plugin-fs";
import { MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useQueryParams from "../../hooks/useQueryParams";
import store from "../../lib/store";
import type { LookupCacheType } from "../../lib/global.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const MoreOptions = () => {
  const { query, setQuery } = useQueryParams();

  const deleteEntry = async () => {
    if (!query?.fileId) return;
    try {
      await fs.remove(`${store.config.stackPath}/${query?.fileId}.md`);

      if (store.config.lookupPath) {
        const lookupJSON = await fs.readTextFile(store.config.lookupPath);
        const parsed: LookupCacheType[] = JSON.parse(lookupJSON);

        const updatedCacheList = parsed.filter(
          (file) => file.fileId !== query?.fileId
        );
        await fs.writeTextFile(
          store.config.lookupPath,
          JSON.stringify(updatedCacheList, null, 2)
        );
      }
      setQuery({ entry: "new" });
    } catch (err) {
      toast.error(`Error occured while deleting entry: ${err}`);
    }
  };

  if (!query?.fileId) return null;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 flex items-center justify-center rounded hover:bg-background hover:text-primary"
            >
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>More Options</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-40">
        {/* <DropdownMenuItem className="font-medium">
          <FullscreenIcon />
          Screenshot
        </DropdownMenuItem> */}
        <DropdownMenuItem className="font-medium" onClick={deleteEntry}>
          <TrashIcon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptions;
