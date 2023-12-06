interface NextIconProps {
  onClickNext: (e: React.MouseEvent<SVGSVGElement>) => void;
  pointer: string;
  color: string;
}

const NextIcon = ({ onClickNext, pointer, color }: NextIconProps) => {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClickNext}
      className={pointer}
    >
      <path
        d="M0.807799 5.59101L10 5.59101"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.4039 0.591003L10 5.591L5.4039 10.591"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NextIcon;
