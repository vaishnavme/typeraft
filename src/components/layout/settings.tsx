import { useEffect, useState } from "react";
import * as tauriDialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";
import { toast } from "sonner";
import { SettingsIcon } from "../icons";
import Modal from "../ui/modal";
import store, { storeKeys } from "../../lib/store";
import Text from "../ui/text";
import Button from "../ui/button";
import Input from "../ui/input";

const Settings = () => {
  const [stackName, setStackName] = useState<string>("");
  const [stackPath, setStackPath] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectStackFolder = async () => {
    try {
      const folder = await tauriDialog.open({
        multiple: false,
        directory: true,
      });
      if (folder) setStackPath(folder);
    } catch {
      //
    }
  };

  const handleSave = async () => {
    if (!stackPath || !stackName) return;

    const currentPath = `${stackPath}/${stackName}`;

    try {
      const isFileExists = await fs.exists(currentPath);
      if (isFileExists) {
        toast.message(
          "Stack folder already exists. Please use different Stack folder."
        );
        return;
      }
      await fs.mkdir(currentPath);
      await store.addItem(storeKeys.path, stackPath);
      await store.addItem(storeKeys.stackName, stackName);
      await store.addItem(storeKeys.currentStackPath, currentPath);

      setOpen(false);
    } catch {
      //
    }
  };

  const loadSavedVault = async () => {
    const savedStackPath = await store.getItem(storeKeys.path);
    const savedStackName = await store.getItem(storeKeys.stackName);

    if (savedStackPath) setStackPath(savedStackPath);
    if (savedStackName) setStackName(savedStackName);
  };

  useEffect(() => {
    loadSavedVault();
  }, []);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Settings"
      modalTrigger={
        <button type="button">
          <SettingsIcon className="size-3" />
        </button>
      }
    >
      <div className="space-y-6">
        <Input
          id="stack"
          label="Stack name"
          subText="Choose a name for your stack"
          value={stackName}
          onChange={(e) => setStackName(e?.target?.value)}
        />

        <div className="flex flex-col gap-y-1">
          <Text medium>Location</Text>
          <Button.Secondary onClick={handleSelectStackFolder}>
            {stackPath || "Choose a location"}
          </Button.Secondary>
          <Text xs className="text-secondary">
            Pick a place to store this stack
          </Text>
        </div>

        <div className="flex items-center justify-end">
          <Button.Primary onClick={handleSave}>Save</Button.Primary>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
