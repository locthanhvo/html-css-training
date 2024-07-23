import { memo } from 'react';
import { Flex, VStack } from '@chakra-ui/react';

// Components
import Avatar from '@/components/common/Avatar';
import Menu from '@/components/Sidebar/Menu';
import Social from '@/components/Sidebar/Social';
import Profile from '@/components/Sidebar/Profile';

// Icons
import {
  PlusCircleIcon,
  MeatballsMenuIcon,
  ProfileIcon,
} from '@/components/common/Icons';

// Constants
import { SIDEBAR_MENU, SIDEBAR_USER_MENU } from '@/constants';

const Sidebar = () => {
  return (
    <VStack bg="ghostWhite" h="full" flexDirection="row">
      <Flex
        h="full"
        px={5}
        py={10}
        borderRight="2px solid"
        borderColor="lightGray"
        direction="column"
        justifyContent="space-between"
      >
        <Flex direction="column" gap={4}>
          {SIDEBAR_MENU.map(({ title, icon: Icon }) => (
            <Flex
              key={title}
              w={50}
              h={50}
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              boxShadow="md"
              cursor="pointer"
              bgColor="white"
            >
              <Icon />
            </Flex>
          ))}
        </Flex>

        <Flex direction="column" gap={4}>
          {SIDEBAR_USER_MENU.map(({ name, image }) => (
            <Avatar key={name} url={image} w={50} h={50} />
          ))}

          <Flex
            w={50}
            h={50}
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            boxShadow="md"
            cursor="pointer"
            bgColor="white"
          >
            <PlusCircleIcon />
          </Flex>
        </Flex>
      </Flex>

      <Flex
        height="full"
        minW={360}
        p={10}
        direction="column"
        justifyContent="space-between"
      >
        <Flex direction="column">
          <Flex justifyContent="space-between">
            <Flex
              w={50}
              h={50}
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              boxShadow="md"
              cursor="pointer"
              bgColor="white"
            >
              <ProfileIcon />
            </Flex>

            <Flex
              w={50}
              h={50}
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              boxShadow="md"
              cursor="pointer"
              bgColor="white"
            >
              <MeatballsMenuIcon />
            </Flex>
          </Flex>

          <Flex
            gap={8}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Profile />

            <Menu />
          </Flex>
        </Flex>

        <Social />
      </Flex>
    </VStack>
  );
};

export default memo(Sidebar);
