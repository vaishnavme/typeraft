import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  modalTrigger: ReactNode;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { modalTrigger, children } = props;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{modalTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 rounded-2xl" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background w-96 p-4 z-50 rounded-lg border border-border">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
