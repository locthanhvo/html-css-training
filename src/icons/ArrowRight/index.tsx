interface ArrowRightIconProps {
  width?: number;
  height?: number;
  rotate?: string;
  color?: string;
}

export const ArrowRightIcon = ({
  rotate,
  width = 14,
  height = 14,
  color = '#7E89AC',
}: ArrowRightIconProps = {}) => (
  <svg
    width={width}
    height={height}
    rotate={rotate}
    style={{
      transform: `rotate(${rotate})`,
    }}
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M7.35938 1.07817L13 6.71875L7.35938 12.3593"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9999 6.71875L1 6.71875"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
