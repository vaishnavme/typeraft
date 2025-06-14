import Drawer from "../ui/drawer";

const SidePanel = () => {
  return (
    <Drawer
      trigger={
        <div className="p-0.5 flex items-center gap-x-1 text-xxs select-none hover:opacity-100 opacity-70 transition-opacity duration-150 jetbrains-mono accent">
          Open
        </div>
      }
    >
      This is Drawer
    </Drawer>
  );
};

export default SidePanel;
