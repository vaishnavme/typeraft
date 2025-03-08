import { toPng } from "html-to-image";
import { FullscreenIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ScreenShot = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const takeScreenShot = async () => {
    const fileName = `${Date.now().toString()}.png`;
    const node = document.getElementById("typeraft");

    if (!node) return;

    setLoading(true);
    toPng(node, {
      quality: 1,
      width: 832,
      style: {
        padding: "32px",
      },
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        toast("Could not download screenshot. ", err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button variant="ghost" size="icon" onClick={takeScreenShot}>
      {loading ? <Loader2Icon className="animate-spin" /> : <FullscreenIcon />}
    </Button>
  );
};

export default ScreenShot;
