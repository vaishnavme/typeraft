import * as tauriDialog from "@tauri-apps/plugin-dialog";
import { SettingsIcon } from "../icons";
import Modal from "../ui/modal";
import { useEffect, useState } from "react";
import store, { storeKeys } from "../../lib/store";

const Settings = () => {
  const [vaultPath, setVaultPath] = useState<string>("");

  const selectVaultFolder = async () => {
    try {
      const folder = await tauriDialog.open({
        multiple: false,
        directory: true,
      });
      if (folder) {
        setVaultPath(folder);
        await store.addItem(storeKeys.path, folder);
      }
    } catch {
      //
    }
  };

  const loadSavedVault = async () => {
    const savedVaultPath = await store.getItem(storeKeys.path);

    if (savedVaultPath) {
      setVaultPath(savedVaultPath);
    }
  };

  useEffect(() => {
    loadSavedVault();
  }, []);

  return (
    <Modal
      modalTrigger={
        <button type="button">
          <SettingsIcon className="size-3" />
        </button>
      }
    >
      <div className="space-y-6 jetbrains-mono">
        <p className="text-sm">Settings</p>

        <div>
          <div className="space-y-2">
            <p className="text-xs whitespace-nowrap">Select folder:</p>
            <button
              type="button"
              onClick={selectVaultFolder}
              className="bg-background-secondary px-3 py-1 text-xs font-mono rounded border border-border hover:bg-background truncate"
            >
              {vaultPath || "Select"}
            </button>
          </div>
          <small className="text-xxs text-gray-300">
            Select where all your entries are stored.
          </small>
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
