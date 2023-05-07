import { SVGProps } from "react";

interface SVG extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const SvgAlert = (props: SVG) => (
  <svg
    width={props.size || "1.5rem"}
    height={props.size || "1.5rem"}
    strokeWidth={3}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 8v4M12 16h.01" />
  </svg>
);
