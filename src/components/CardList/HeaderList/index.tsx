import { memo } from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';

// Components
import ActionButton from '@/components/common/ActionButton';

// Icons
import { PlusIcon, MeatballsMenuIcon } from '@/components/common/Icons';

interface HeaderListProps {
  onClick?: () => void;
  title?: string;
  total?: number;
  color?: string;
}

const HeaderList = ({ onClick, title, color, total }: HeaderListProps) => {
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

      <Flex gap={4}>
        <ActionButton title="Option" rightIcon={<MeatballsMenuIcon />} />
        <ActionButton title="Add" leftIcon={<PlusIcon />} onClick={onClick} />
      </Flex>
    </VStack>
  );
};

export default memo(HeaderList);
