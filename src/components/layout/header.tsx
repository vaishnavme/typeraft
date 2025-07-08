import React, { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Settings from "./settings";
import SidePanel from "./side-panel";

interface WindowControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const WindowControlButton: React.FC<WindowControlButtonProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <button
      type="button"
      className={`size-3 rounded-full ${className}`}
      {...rest}
    />
  );
};

WindowControlButton.displayName = "WindowControlButton";

const Header = () => {
  const appWindow = getCurrentWindow();

  const [isFullscreen, setIsFullScreen] = useState<boolean>(false);

  const toggleWindowSize = async () => {
    const currentState = isFullscreen;
    setIsFullScreen(!currentState);
    appWindow.setFullscreen(!currentState);
  };

  const checkCurrentWindowSetup = async () => {
    const currentStatus = await appWindow.isFullscreen();
    setIsFullScreen(currentStatus);
  };

  useEffect(() => {
    checkCurrentWindowSetup();
  }, []);

  return (
    <header
      data-tauri-drag-region
      className="fixed left-2 top-2 w-full h-8 flex items-center justify-between pl-2 pr-5"
    >
      <div className="flex items-center gap-x-2">
        <WindowControlButton
          aria-label="Close Window"
          className="bg-red-400 hover:bg-red-500 transition-all ease-in-out"
          onClick={() => appWindow.close()}
        />
        <WindowControlButton
          aria-label="Close Minimize"
          className="bg-amber-500 hover:bg-amber-600 transition-all ease-in-out"
          onClick={() => appWindow.minimize()}
        />
        <WindowControlButton
          aria-label="Close Resize"
          className="bg-green-500 hover:bg-green-600 transition-all ease-in-out"
          onClick={toggleWindowSize}
        />
      </div>
      <div className="flex items-center gap-x-1">
        <Settings />
        <SidePanel />
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
