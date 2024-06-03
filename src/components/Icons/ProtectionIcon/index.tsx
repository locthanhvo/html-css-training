interface ConfigIconProps {
  isExpanded?: boolean;
}

export const ProtectionIcon = ({ isExpanded }: ConfigIconProps) => (
  <svg
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5">
      <path
        d="M2.6 1.30005H15.4C15.8243 1.30005 16.2313 1.46862 16.5314 1.76868C16.8314 2.06874 17 2.4757 17 2.90005V7.70005C17 9.82178 16.1571 11.8566 14.6569 13.3569C13.1566 14.8572 11.1217 15.7 9 15.7C7.94943 15.7 6.90914 15.4931 5.93853 15.0911C4.96793 14.689 4.08601 14.0998 3.34315 13.3569C1.84285 11.8566 1 9.82178 1 7.70005V2.90005C1 2.4757 1.16857 2.06874 1.46863 1.76868C1.76869 1.46862 2.17565 1.30005 2.6 1.30005V1.30005Z"
        stroke={isExpanded ? 'white' : 'gray'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.80005 6.90002L9.00005 10.1L12.2 6.90002"
        stroke={isExpanded ? 'white' : 'gray'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
