import { SVGProps } from 'react'

interface SVG extends SVGProps<SVGSVGElement> {
  size?: number
}

export const SvgEmail = (props: SVG) => (
  <svg
    width={props.size || '2rem'}
    height={props.size || '2rem'}
    strokeWidth={3}
    viewBox="0 0 24 24"
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M0 0h24v24H0z' stroke='none' />
    <path d='M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0' />
    <path d='M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28' />
  </svg>
)
