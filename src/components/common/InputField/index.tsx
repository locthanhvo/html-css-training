import {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  forwardRef,
  ForwardedRef,
} from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react';

type TInputFieldProps = Omit<InputProps, 'onChange'> & {
  isValidate?: boolean;
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (value: string) => void;
};

const InputField = (
  {
    isError = false,
    errorMessages = 'Default error',
    label,
    leftIcon,
    rightIcon,
    onChange,
    ...rest
  }: TInputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange?.(e.target.value),
    [onChange],
  );

  return (
    <FormControl isInvalid={isError} maxW={430}>
      {label && (
        <FormLabel
          fontSize="base"
          fontWeight="regular"
          marginInlineEnd={0}
          minW="max-content"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement top={1} pointerEvents="none">
            {leftIcon}
          </InputLeftElement>
        )}

        <Input
          py={5}
          type="text"
          onChange={handleChangeValue}
          ref={ref}
          {...rest}
          isInvalid={isError}
        />

        {rightIcon && (
          <InputRightElement top={1} pointerEvents="none">
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
      {isError && (
        <FormErrorMessage fontSize="2xs">{errorMessages}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default memo(forwardRef(InputField));
