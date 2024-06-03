interface ArrowIconProps {
  width?: string;
  height?: string;
  isExpanded: boolean;
  rotate?: string;
}

export const ArrowIcon = ({
  width = '15',
  height = '9',
  isExpanded,
  rotate,
}: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 9"
      fill="none"
      style={{ transform: isExpanded ? 'rotate(0deg)' : `rotate(${rotate})` }}
    >
      <path
        d="M0.365273 0.522622C0.576242 0.311717 0.862339 0.193237 1.16065 0.193237C1.45896 0.193237 1.74505 0.311717 1.95602 0.522622L7.52477 6.09137L13.0935 0.522622C13.3057 0.317694 13.5899 0.2043 13.8849 0.206863C14.1798 0.209427 14.462 0.327742 14.6706 0.536326C14.8792 0.74491 14.9975 1.02707 15 1.32205C15.0026 1.61702 14.8892 1.90119 14.6843 2.11337L8.32015 8.4775C8.10918 8.6884 7.82308 8.80688 7.52477 8.80688C7.22646 8.80688 6.94037 8.6884 6.7294 8.4775L0.365273 2.11337C0.154369 1.9024 0.0358887 1.61631 0.0358887 1.318C0.0358887 1.01969 0.154369 0.733591 0.365273 0.522622Z"
        fill={isExpanded ? 'white' : 'gray'}
      />
    </svg>
  );
};
