import { JSXElementConstructor, ReactElement, memo } from 'react';
import { Button } from '@chakra-ui/react';

interface ActionButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  isDisabled?: boolean;
  title?: string;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  onClick?: () => void;
  rightIcon?:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
}

const ActionButton = ({
  title,
  type = 'button',
  size,
  isLoading,
  isDisabled,
  bgColor,
  color,
  borderColor,
  rightIcon,
  onClick,
}: ActionButtonProps) => {
  return (
    <Button
      type={type}
      name={title}
      size={size}
      bgColor={bgColor}
      color={color}
      border="1px solid"
      borderColor={borderColor}
      onClick={onClick}
      rightIcon={rightIcon}
      isLoading={isLoading}
      isDisabled={isDisabled}
    >
      {title}
    </Button>
  );
};

export default memo(ActionButton);
