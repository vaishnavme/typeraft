import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CancelIcon } from "../icons";
import Text from "./text";

interface ModalProps {
  modalTrigger: ReactNode;
  children: ReactNode;
  title: string;
  open: boolean;
  onOpenChange: (status: boolean) => void;
}

const Modal = (props: ModalProps) => {
  const { modalTrigger, open, title, children, onOpenChange } = props;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild onClick={() => onOpenChange(true)}>
        {modalTrigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 rounded-2xl" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background w-96 p-4 z-50 rounded-2xl border border-border">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {title ? (
                <Dialog.DialogTitle>
                  <Text lg medium>
                    {title}
                  </Text>
                </Dialog.DialogTitle>
              ) : null}
              <Dialog.Close
                onClick={() => onOpenChange(false)}
                className="bg-background hover:bg-border p-1.5 rounded-lg"
              >
                <CancelIcon className="size-4" />
              </Dialog.Close>
            </div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
