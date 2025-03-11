/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const SuggestionMenu = forwardRef((props, ref) => {
  // @ts-expect-error
  const { suggestionOptions, onOptionSelect, renderOptionComponent } = props;

  const suggestedItemListRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onSelectedIndex = (index: number) => {
    const item = suggestionOptions[index];
    if (item) onOptionSelect(item);
  };

  const enterHandler = () => onSelectedIndex(selectedIndex);

  const downKeyHandler = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestionOptions.length);
  };

  const upKeyHandler = () => {
    setSelectedIndex(
      (prevIndex) =>
        (prevIndex + suggestionOptions.length - 1) % suggestionOptions.length
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        switch (event.key) {
          case "ArrowUp":
            upKeyHandler();
            return true;

          case "ArrowDown":
            downKeyHandler();
            return true;

          case "Enter":
            enterHandler();
            return true;

          default:
            return false;
        }
      },
    }),
    [selectedIndex, suggestionOptions]
  );

  if (!suggestionOptions?.length) {
    return null;
  }

  return (
    <div className="w-56 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md">
      <ul className="max-h-72 overflow-y-auto">
        {/* @ts-expect-error */}
        {suggestionOptions.map((option, index) => {
          const isSelected = selectedIndex === index;

          if (selectedIndex === index) {
            suggestedItemListRef.current[selectedIndex]?.scrollIntoView({
              block: "nearest",
            });
          }

          return (
            <button
              key={`suggested-option-${index + 2}`}
              type="button"
              className="w-full text-left"
              onClick={(e) => {
                e.stopPropagation();
                onSelectedIndex(index);
              }}
              ref={(element) => {
                suggestedItemListRef.current[index] = element;
              }}
            >
              <li
                className={`${
                  isSelected ? "bg-accent text-accent-foreground" : ""
                } w-full text-left hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
              >
                {renderOptionComponent({ option, index })}
              </li>
            </button>
          );
        })}
      </ul>
    </div>
  );
});

SuggestionMenu.displayName = "SuggestionMenu";

export default SuggestionMenu;
