import { memo } from 'react';
import { Button, Flex, Text, VStack } from '@chakra-ui/react';

// Icons
import { PlusIcon, MeatballsMenuIcon } from '@/components/common/Icons';

interface HeaderListProps {
  title?: string;
  total?: number;
  color?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const HeaderList = ({
  onClick,
  title = '',
  color = 'primary',
  total = 0,
  isDisabled = false,
}: HeaderListProps) => {
  return (
    <VStack
      position="relative"
      w={230}
      bgColor="white"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      boxShadow="md"
      py={4}
      px={3}
      pr={2}
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: '50%',
        width: '3px',
        bg: color,
        borderRadius: 'lg',
      }}
    >
      <Flex gap={3} justifyContent="center" alignItems="center">
        <Text size="base" color="steelBlue" textTransform="uppercase">
          {title}
        </Text>

        <Flex
          w={30}
          h={30}
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          boxShadow="md"
          bgColor="white"
          fontSize="sm"
          color="primary"
        >
          {total}
        </Flex>
      </Flex>

      <Flex>
        <Button name="menu" variant="outline">
          <MeatballsMenuIcon />
        </Button>

        <Button
          name="add-task"
          variant="outline"
          onClick={onClick}
          isDisabled={isDisabled}
        >
          <PlusIcon />
        </Button>
      </Flex>
    </VStack>
  );
};

export default memo(HeaderList);
