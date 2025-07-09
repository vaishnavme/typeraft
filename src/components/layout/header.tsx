import React, { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { PencilRulerIcon } from "lucide-react";
import Settings from "./settings";
import SidePanel from "./side-panel";
import { Button } from "../ui/button";
import useQueryParams from "../../hooks/useQueryParams";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import MoreOptions from "./more-options";

interface WindowControlButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const WindowControlButton: React.FC<WindowControlButtonProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={`size-3 rounded-full disabled:bg-gray-500 ${className}`}
          {...rest}
        />
      </TooltipTrigger>
      <TooltipContent>{props["aria-label"]}</TooltipContent>
    </Tooltip>
  );
};

WindowControlButton.displayName = "WindowControlButton";

const Header = () => {
  const appWindow = getCurrentWindow();
  const { setQuery } = useQueryParams();

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
      className="sticky w-full h-8 flex items-center justify-between bg-background px-1.5 z-10 rounded-t-md"
    >
      <div className="flex items-center gap-x-2">
        <WindowControlButton
          aria-label="Close"
          className="bg-red-400 hover:bg-red-500 transition-all ease-in-out"
          onClick={() => appWindow.close()}
        />
        <WindowControlButton
          aria-label="Minimize"
          className="bg-amber-500 hover:bg-amber-600 transition-all ease-in-out"
          onClick={() => appWindow.minimize()}
          disabled={isFullscreen}
        />
        <WindowControlButton
          aria-label="Resize"
          className="bg-green-500 hover:bg-green-600 transition-all ease-in-out"
          onClick={toggleWindowSize}
        />
      </div>
      <div className="flex items-center gap-x-1">
        <MoreOptions />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery({ entry: "new" })}
              className="size-6 flex items-center justify-center rounded hover:bg-background hover:text-primary"
            >
              <PencilRulerIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create Entry</TooltipContent>
        </Tooltip>

        <Settings />
        <SidePanel />
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
