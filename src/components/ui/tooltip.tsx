import { JSX, RefAttributes } from "react";
import {
  ITooltip,
  Tooltip as ReactTooltip,
  TooltipRefProps,
} from "react-tooltip";

const Tooltip = (
  props: JSX.IntrinsicAttributes & ITooltip & RefAttributes<TooltipRefProps>
) => <ReactTooltip {...props} className="typeraft-tooltip" />;

export default Tooltip;
