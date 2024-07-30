import { Flex, Text, VStack } from '@chakra-ui/react';
import Navbar from '../common/Navbar';
import InputField from '../common/InputField';
import {
  UserProfileIcon,
  ForwardArrowIcon,
  FavoriteIcon,
  MenuIcon,
  NotifyIcon,
  SearchIcon,
} from '../common/Icons';
import { memo } from 'react';

interface HeaderProps {
  w?: number | string;
}

const Header = ({ w = 1600 }: HeaderProps) => {
  return (
    <VStack
      bgColor="ghostWhite"
      w={w}
      p={4}
      flexDirection="row"
      justifyContent="space-between"
      borderBottom="2px solid"
      borderColor="lightGray"
    >
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
        <MenuIcon />
      </Flex>

      <Text color="steelBlue" size="xl">
        Constructor
      </Text>

      <Navbar />

      <InputField
        leftIcon={<SearchIcon />}
        rightIcon={<ForwardArrowIcon />}
        placeholder="Search Tasks"
        variant="secondary"
        borderRadius="2xl"
        size="lg"
      />

      <Flex gap={2} alignItems="center" justifyContent="center">
        <UserProfileIcon />
        <Text size="md" color="primary">
          Clayton Santos
        </Text>
      </Flex>

      <Flex gap={2.5}>
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
          <NotifyIcon />
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
          <FavoriteIcon />
        </Flex>
      </Flex>
    </VStack>
  );
};
export default memo(Header);
