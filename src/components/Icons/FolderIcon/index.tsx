interface FolderIconProps {
  isExpanded?: boolean;
}

export const FolderIcon = ({ isExpanded }: FolderIconProps) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
    <path
      opacity="0.5"
      d="M17 14.1C17 14.5244 16.8314 14.9314 16.5314 15.2314C16.2313 15.5315 15.8243 15.7 15.4 15.7H2.6C2.17565 15.7 1.76869 15.5315 1.46863 15.2314C1.16857 14.9314 1 14.5244 1 14.1V2.90005C1 2.4757 1.16857 2.06874 1.46863 1.76868C1.76869 1.46862 2.17565 1.30005 2.6 1.30005H6.6L8.2 3.70005H15.4C15.8243 3.70005 16.2313 3.86862 16.5314 4.16868C16.8314 4.46874 17 4.8757 17 5.30005V14.1Z"
      stroke={isExpanded ? 'white' : 'gray'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
