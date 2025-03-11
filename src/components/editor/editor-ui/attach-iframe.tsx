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

const AttachIframe = ({ editor }: { editor: Editor }) => {
  const [embedURL, setEmbedURL] = useState<string>("");

  const onAttachURL = () => {
    if (!embedURL) return;

    editor.chain().focus().setIframe({ src: embedURL }).run();
  };

  return (
    <Dialog onOpenChange={() => setEmbedURL("")}>
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
          <div>
            {embedURL ? (
              <div className="w-full h-48 rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedURL}
                  className="aspect-video w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-48 border border-dashed rounded-2xl flex items-center justify-center aspect-video">
                <p className="text-xs text-accent-foreground">
                  Preview Iframe here
                </p>
              </div>
            )}
          </div>
          <Input
            type="url"
            value={embedURL}
            placeholder="https://embed-url-here.com"
            onChange={(e) => setEmbedURL(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onAttachURL}>Attach</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttachIframe;
