import { HTMLAttributes, memo } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

// Icons
import { AttachmentIcon } from '@/components/common/Icons';

interface UploadFileProps {
  previewURLs?: string[];
  isDisabled?: boolean;
  variant?: 'icon' | 'button';
  getRootProps?: (
    props?: HTMLAttributes<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
  getInputProps?: (
    props?: HTMLAttributes<HTMLElement>,
  ) => HTMLAttributes<HTMLElement>;
}

const UploadFile = ({
  previewURLs = [],
  isDisabled = false,
  variant = 'icon',
  getInputProps = (props) => ({ ...props }),
  getRootProps = (props) => ({ ...props }),
}: UploadFileProps) => {
  return (
    <Button
      gap={3}
      variant={variant === 'button' ? 'secondary' : 'outline'}
      w={variant === 'button' ? 168 : 'none'}
      h={8}
      isDisabled={isDisabled}
      borderRadius="md"
      cursor="pointer"
      {...getRootProps()}
    >
      <Flex alignItems="center" justifyContent="center" gap={2}>
        {variant === 'icon' && <AttachmentIcon />}
        {variant === 'icon' && !!previewURLs.length && (
          <Text fontSize="sm" color="coolGray" textAlign="center">
            {previewURLs.length}
          </Text>
        )}
      </Flex>
      {variant === 'button' && (
        <Text fontSize="base" textAlign="center">
          Attachment
        </Text>
      )}
      <Input display="none" {...getInputProps()} />
    </Button>
  );
};

export default memo(UploadFile);
