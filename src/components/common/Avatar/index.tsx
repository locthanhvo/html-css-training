import { Center, Image } from '@chakra-ui/react';
import { memo } from 'react';

interface AvatarProps {
  url?: string;
  w?: number;
  h?: number;
}

const Avatar = ({ url, w = 20, h = 20 }: AvatarProps) => {
  return (
    <Center w={w} h={h} borderRadius="50%">
      <Image borderRadius="50%" src={url} w={w} h={h} alt={url} />
    </Center>
  );
};

export default memo(Avatar);
