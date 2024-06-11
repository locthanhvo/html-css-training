import { Center, Flex, Image, Text } from '@chakra-ui/react';

import AvatarDefault from '../../assets/images/avatar.png';
import { memo } from 'react';

interface AvatarProps {
  url?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const Avatar = ({ url, firstName, lastName, email }: AvatarProps) => {
  return (
    <Flex gap={2} alignItems="center">
      <Center w={10} h={10} borderRadius="50%">
        <Image src={url || AvatarDefault} />
      </Center>

      <Flex direction="column">
        <Text color="primary" fontWeight="medium" fontSize="base">
          {firstName} {lastName}
        </Text>
        <Text color="primary" fontWeight="regular" fontSize="xs">
          {email}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(Avatar);
