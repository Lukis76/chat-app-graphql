

import { SVGProps } from 'react'

interface SVG extends SVGProps<SVGSVGElement> {
  size?: number
}

export const SvgUser = (props: SVG) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-user-circle"
    width={props.size || '2rem'}
    height={props.size || '2rem'}
    strokeWidth={3}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
    <path d="M9 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
  </svg>
)