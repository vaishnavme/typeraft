import Button from "../ui/button";

interface SidePanelProps {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const SidePanel = (props: SidePanelProps) => {
  const { showDrawer, setShowDrawer } = props;

  return (
    <aside
      className={`fixed top-0 right-0 h-screen rounded-r-xl w-72 p-4 bg-background border-l border-r-6 border-y-6 border-border shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
        showDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <p className="mono text-accent text-xs font-medium">all entries</p>
        <Button.MonoButton onClick={() => setShowDrawer(false)}>
          close ✕
        </Button.MonoButton>
      </div>
    </aside>
  );
};

export default SidePanel;
