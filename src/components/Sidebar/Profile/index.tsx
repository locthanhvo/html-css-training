import { memo } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import AvatarUrl from '@/assets/images/avatar-large.webp';

interface ProfileProps {
  name?: string;
  email?: string;
  notifications?: number;
}

const Profile = ({
  name = 'Alfred Bryant',
  email = 'adrain.nader@yahoo.com',
  notifications = 0,
}: ProfileProps) => (
  <>
    <Flex
      w={130}
      h={130}
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      cursor="pointer"
      border="2px solid"
      borderColor="lightGray"
      position="relative"
    >
      <Image
        src={AvatarUrl}
        alt="avatar"
        zIndex={1}
        borderRadius="50%"
        w={110}
        h={110}
      />

      <Flex
        position="absolute"
        bottom={2}
        right={0}
        width={30}
        height={30}
        borderRadius="50%"
        backgroundColor="royalBlue"
        zIndex={3}
        textAlign="center"
        color="white"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
      >
        {notifications}
      </Flex>

      <Box
        position="absolute"
        top={0}
        left={0}
        width="full"
        height="full"
        borderRadius="50%"
        border="2px solid"
        borderColor="royalBlue"
        clipPath="inset(0 10% 0 0)"
        zIndex={2}
      />
    </Flex>
    <Flex textAlign="center" direction="column" gap={1}>
      <Text color="primary" size="lg">
        Hello {name}
      </Text>

      <Text color="coolGray" size="md">
        {email}
      </Text>
    </Flex>
  </>
);

export default memo(Profile);
