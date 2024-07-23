import { HTMLAttributes, memo } from 'react';
import { Center, Flex, Input, Text } from '@chakra-ui/react';

// Icons
import { AttachmentIcon } from '@/components/common/Icons';

interface UploadFileProps {
  previewURLs?: string[];
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
  variant = 'icon',
  getInputProps = (props) => ({ ...props }),
  getRootProps = (props) => ({ ...props }),
}: UploadFileProps) => {
  return (
    <Center
      gap={3}
      w={variant === 'button' ? 168 : 'none'}
      h={8}
      border={variant === 'button' ? '2px solid' : 'none'}
      borderColor="lightGray"
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
        <Text fontSize="sm" color="primary" textAlign="center">
          Attachment
        </Text>
      )}
      <Input display="none" {...getInputProps()} />
    </Center>
  );
};

export default memo(UploadFile);
