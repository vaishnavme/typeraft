import { type ElementType, type HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  medium?: boolean;
  semibold?: boolean;
  xxs?: boolean;
  xs?: boolean;
  base?: boolean;
  lg?: boolean;
  xxl?: boolean;
}

const Text = (props: TextProps) => {
  const {
    as: Component = "p",
    medium,
    semibold,
    xxs,
    xs,
    base,
    lg,
    xxl,
    className = "",
    ...rest
  } = props;

  let fontWeight = "";
  if (semibold) fontWeight = "font-semibold";
  else if (medium) fontWeight = "font-medium";

  // Default to sm, xxs is smallest
  let fontSize = "text-sm";
  if (xxs) fontSize = "text-xxs";
  else if (xs) fontSize = "text-xs";
  else if (base) fontSize = "text-base";
  else if (lg) fontSize = "text-lg";
  else if (xxl) fontSize = "text-2xl";

  return (
    <Component
      className={[fontWeight, fontSize, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
};

export default Text;
