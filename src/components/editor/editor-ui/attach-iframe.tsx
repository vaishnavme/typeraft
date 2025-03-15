import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Editor } from "@tiptap/react";
import { TvMinimalIcon } from "lucide-react";
import { useState } from "react";
import { getEmbedURL } from "../editor-utils";
import { toast } from "sonner";

const AttachIframe = ({ editor }: { editor: Editor }) => {
  const [url, setURL] = useState<string>("");

  const onAttachURL = () => {
    if (!url) {
      toast("Please add url.");
      return;
    }

    try {
      const embedURL = getEmbedURL(url);
      if (embedURL) {
        editor.chain().focus().setIframe({ src: embedURL }).run();
      }
    } catch (err) {
      const errorMsg = (err as Error)?.message || "Something went wrong.";
      toast.error(errorMsg);
    }
  };

  return (
    <Dialog onOpenChange={() => setURL("")}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TvMinimalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Embed Iframe</DialogTitle>
          <DialogDescription>
            Attach iframe embed in document.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Input
            type="url"
            value={url}
            placeholder="https://embed-url-here.com"
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onAttachURL}>Attach</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttachIframe;
