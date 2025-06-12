import type { SVGProps } from "react";

export const ArrowUpDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill="none"
    {...props}
  >
    <path
      d="M7 4v16M17 19V4M10 7S7.79 4 7 4 4 7 4 7M20 17s-2.21 3-3 3-3-3-3-3"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
