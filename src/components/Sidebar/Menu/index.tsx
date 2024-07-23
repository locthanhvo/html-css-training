import { memo } from 'react';
import { Flex, SimpleGrid } from '@chakra-ui/react';

// Constants
import { MENU_LIST } from '@/constants';

const Menu = () => {
  return (
    <SimpleGrid
      templateColumns={'repeat(2, 1fr)'}
      border="2px solid"
      borderColor="lightGray"
      borderRadius="2xl"
    >
      {MENU_LIST.map(({ id, title, style, icon: Icon }) => (
        <Flex
          key={id}
          w={120}
          h={120}
          gap={5}
          direction="column"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          color="coolGray"
          fontSize="base"
          {...style}
        >
          <Icon />

          {title}
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default memo(Menu);
