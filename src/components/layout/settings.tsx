import { useState } from "react";
import * as tauriDialog from "@tauri-apps/plugin-dialog";
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

const Settings = () => {
  const [stackName, setStackName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-[10px] px-2 py-0.5 font-mono font-medium hover:text-foreground/70"
        >
          Settings
        </button>
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
            <Button size="sm">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

Settings.displayName = "Settings";

export default Settings;
