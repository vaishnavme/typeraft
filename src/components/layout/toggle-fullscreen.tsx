import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Button from "../ui/button";

const ToggleFullScreen = () => {
  const [isFullscreen, setIsFullScreen] = useState<boolean>(false);

  const toggleWindowSize = async () => {
    const currentState = isFullscreen;
    setIsFullScreen(!currentState);
    await getCurrentWindow().setFullscreen(!currentState);
  };

  const checkCurrentWindowSetup = async () => {
    const currentStatus = await getCurrentWindow().isFullscreen();
    setIsFullScreen(currentStatus);
  };

  useEffect(() => {
    checkCurrentWindowSetup();
  }, []);

  return (
    <Button.MonoButton onClick={toggleWindowSize}>
      {isFullscreen ? "minimize" : "full-screen"}
    </Button.MonoButton>
  );
};

export default ToggleFullScreen;
