import { memo } from 'react';

// Components
import { Flex, Text } from '@chakra-ui/react';
import { ActionButton } from '@/components';

interface ProductProps {
  title?: string;
  itemName?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onConfirm?: () => void;
  onCloseModal?: () => void;
}

const ConfirmModal = ({
  title,
  itemName,
  isLoading,
  isDisabled,
  onConfirm,
  onCloseModal,
}: ProductProps) => (
  <Flex direction="column" alignItems="center" gap={3}>
    <Flex direction="column" gap={3} alignItems="center">
      <Text fontSize="md">{title}</Text>
      <Text as="span" pl={1} color="red.500" fontWeight="bold">
        {itemName}
      </Text>
    </Flex>
    <Flex my={4} gap={3} justifyContent="center">
      <ActionButton
        size="sm"
        title="Cancel"
        bgColor="primary"
        color="blue.100"
        borderColor="blue.100"
        onClick={onCloseModal}
      />
      <ActionButton
        size="sm"
        title="Confirm"
        bgColor="blue.200"
        onClick={onConfirm}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </Flex>
  </Flex>
);

export default memo(ConfirmModal);
