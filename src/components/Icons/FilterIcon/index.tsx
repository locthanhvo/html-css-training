interface FilterIconProps {
  color: string;
}

const FilterIcon = ({ color }: FilterIconProps) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="icon"
        d="M17.6794 2.69574C18.4485 1.85054 17.747 0.615845 16.4977 0.615845H1.50231C0.252981 0.615845 -0.448496 1.85054 0.320645 2.69573L7.55735 10.5653C7.76333 10.7916 7.87522 11.0706 7.87522 11.3579V18.3762C7.87522 18.6055 8.19826 18.7204 8.38719 18.5582L9.9049 17.2552C10.0455 17.1345 10.1245 16.9708 10.1245 16.8001V11.3579C10.1245 11.0706 10.2364 10.7916 10.4424 10.5653L17.6794 2.69574Z"
        fill={color}
      />
    </svg>
  );
};

export default FilterIcon;
