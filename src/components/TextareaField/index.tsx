import {
  ChangeEvent,
  memo,
  useCallback,
  forwardRef,
  ForwardedRef,
} from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';

type TInputFieldProps = Omit<TextareaProps, 'onChange'> & {
  isValidate?: boolean;
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  onChange: (value: string) => void;
};

const TextareaField = (
  {
    isError = false,
    errorMessages = 'Default error',
    label,
    onChange,
    ...rest
  }: TInputFieldProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <FormControl isInvalid={isError}>
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

      <Textarea
        h={200}
        py={5}
        color="text.primary"
        onChange={handleChangeValue}
        ref={ref}
        {...rest}
        isInvalid={isError}
        _focus={{ border: '1px solid', borderColor: 'blue.100' }}
      />
      {isError && (
        <FormErrorMessage fontSize="2xs">{errorMessages}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default memo(forwardRef(TextareaField));
