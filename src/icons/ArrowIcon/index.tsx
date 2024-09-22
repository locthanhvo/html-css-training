interface ArrowIconProps {
  width?: number;
  height?: number;
  rotate?: string;
}

export const ArrowIcon = ({
  width = 12,
  height = 13,
  rotate,
}: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 12 13"
    fill="none"
    style={{
      transform: `rotate(${rotate})`,
    }}
  >
    <g opacity="0.8">
      <path
        d="M7.49976 3.55957L4.49976 6.55957L7.49976 9.55957"
        stroke="#AEB9E1"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default ArrowIcon;
