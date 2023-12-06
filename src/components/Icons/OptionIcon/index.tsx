// OptionIcon.tsx
import { ReactNode, MouseEvent } from "react";

interface OptionIconProps {
  isSelected: boolean;
  onClickOption: (event: MouseEvent) => void;
  iconComponent: ReactNode;
}

const OptionIcon = ({
  isSelected,
  onClickOption,
  iconComponent,
}: OptionIconProps) => (
  <div
    className={`option-icon-container ${isSelected ? "icon-selected" : ""}`}
    onClick={onClickOption}
  >
    {iconComponent}
  </div>
);

export default OptionIcon;
