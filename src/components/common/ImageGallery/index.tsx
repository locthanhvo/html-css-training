import { memo } from 'react';
import { Box, Image } from '@chakra-ui/react';

interface Props {
  previewURL: string;
  index: number;
}

const ImageGallery = ({ previewURL }: Props) => {
  return (
    <Box position="relative">
      <Image
        w={230}
        src={previewURL}
        alt={previewURL}
        fallbackSrc={previewURL}
        objectFit="contain"
      />
    </Box>
  );
};

export default memo(ImageGallery);
