import { useState, type ReactNode } from "react";

interface DrawerProps {
  trigger?: ReactNode;
  children: ReactNode;
}

const Drawer = (props: DrawerProps) => {
  const { trigger, children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button type="button" onClick={onOpen}>
        {trigger || "Open"}
      </button>
      {/* Overlay */}
      {/* <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-200 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      /> */}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80  shadow-lg z-50 transform transition-transform duration-300 drawer-background ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex={-1}
      >
        <button
          className="absolute top-2 right-2 text-lg p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800"
          onClick={onClose}
          aria-label="Close drawer"
        >
          ×
        </button>
        <div className="p-6">layout{children}</div>
      </aside>
    </>
  );
};

export default Drawer;
