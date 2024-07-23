import { memo } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface ActionButtonProps extends ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  isDisabled?: boolean;
  title?: string;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  onClick?: () => void;
}

const ActionButton = ({
  title = 'Save',
  type = 'button',
  size = 'sm',
  isLoading = false,
  isDisabled = false,
  bgColor,
  color,
  borderColor,
  onClick,
  ...props
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
      isLoading={isLoading}
      isDisabled={isDisabled}
      {...props}
    >
      {title}
    </Button>
  );
};

export default memo(ActionButton);
