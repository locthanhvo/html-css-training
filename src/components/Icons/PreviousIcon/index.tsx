
interface PreviousIconProps {
  onClickPrevious: (e: React.MouseEvent<SVGSVGElement>) => void
  pointer: string
  color: string
}

const PreviousIcon = ({ onClickPrevious, pointer, color }: PreviousIconProps) => {
  return (
    <svg
      width='11'
      height='12'
      viewBox='0 0 11 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClickPrevious}
      className={pointer}
    >
      <path
        d='M10.2006 5.591H1.00836'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.60446 10.591L1.00836 5.591L5.60446 0.591003'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default PreviousIcon
