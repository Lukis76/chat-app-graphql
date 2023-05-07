import { SVGProps } from "react";

interface SVG extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const SvgView = (props: SVG) => (
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
    <path d="M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7" />
  </svg>
);
