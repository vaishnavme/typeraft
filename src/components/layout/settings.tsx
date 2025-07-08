import { useEffect, useState } from "react";
import * as tauriDialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Text from "../ui/text";
import ThemePalette from "./theme-palette";
import Typeface from "./typeface";
import store from "../../lib/store";
import { lookup_cache } from "../../lib/constants";
import { useTheme } from "../../provider/theme-provider";
import { SettingsIcon } from "lucide-react";

const Settings = () => {
  const { theme, font } = useTheme();

  const [stackName, setStackName] = useState<string>(store.stackName || "");
  const [location, setLocation] = useState<string>(store.location || "");
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const saveConfig = async () => {
    if (!stackName || !location) return;

    try {
      const stackLocation = `${location}/${stackName}`;
      const lookupfile = `${stackLocation}/${lookup_cache}`;
      const isFileExist = await fs.exists(stackLocation);
      if (!isFileExist) {
        await fs.mkdir(stackLocation);
        await fs.writeTextFile(lookupfile, JSON.stringify([], null, 2));
      }

      await store.setLocation(location);
      await store.setStackName(stackName);
      await store.setTheme(theme);
      await store.setFont(font);

      setOpenSetting(false);
    } catch {
      //
    }
  };

  const handleSelectLocation = async () => {
    try {
      const folder = await tauriDialog.open({
        multiple: false,
        directory: true,
      });
      if (folder) {
        setLocation(folder);
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    if (openSetting) {
      setLocation(store.location || "");
      setStackName(store.stackName || "");
    }
  }, [openSetting]);

  return (
    <Dialog open={openSetting} onOpenChange={setOpenSetting}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 flex items-center justify-center rounded hover:bg-background hover:text-primary"
        >
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 w-96" showCloseButton={false}>
        <DialogHeader className="gap-y-1 mb-8">
          <DialogTitle className="text-base font-medium text-center">
            Typeraft
          </DialogTitle>
          <DialogDescription className="text-center">
            A distraction-free writing experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-6">
            <Input
              label="Stack name"
              placeholder="eg. Personal, Thoughts"
              subText="Pick a name for your stack"
              value={stackName}
              onChange={(e) => setStackName(e.target.value)}
            />
            <div className="flex flex-col gap-y-1">
              <Text size="xs" weight="medium">
                Location
              </Text>
              <div>
                <Button
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={handleSelectLocation}
                >
                  {location?.slice(0, 45) || "Choose a location"}
                </Button>
              </div>
              <Text size="xs" className="text-muted-foreground">
                Pick a place to store stack
              </Text>
            </div>

            <ThemePalette />

            <Typeface />
          </div>

          <div className="flex items-center justify-end">
            <Button onClick={saveConfig} size="sm">
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

Settings.displayName = "Settings";

export default Settings;
