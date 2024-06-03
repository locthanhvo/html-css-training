interface ConfigIconProps {
  isExpanded?: boolean;
}

export const DirectionIcon = ({ isExpanded }: ConfigIconProps) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
    <g opacity="0.5">
      <path
        d="M3.4 12.5H2.6C2.17565 12.5 1.76869 12.3315 1.46863 12.0314C1.16857 11.7314 1 11.3244 1 10.9V2.90005C1 2.4757 1.16857 2.06874 1.46863 1.76868C1.76869 1.46862 2.17565 1.30005 2.6 1.30005H15.4C15.8243 1.30005 16.2313 1.46862 16.5314 1.76868C16.8314 2.06874 17 2.4757 17 2.90005V10.9C17 11.3244 16.8314 11.7314 16.5314 12.0314C16.2313 12.3315 15.8243 12.5 15.4 12.5H14.6"
        stroke={isExpanded ? 'white' : 'gray'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 10.9L13 15.7H5L9 10.9Z"
        stroke={isExpanded ? 'white' : 'gray'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
