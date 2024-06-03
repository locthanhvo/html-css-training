import { fonts } from '@/themes/base/typography';
import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: fonts.body,
    fontWeight: 'regular',
    borderRadius: 'lg',
  },
  sizes: {
    sm: {
      w: '5.125rem',
      px: 2,
      py: 2,
      fontSize: '2xs',
    },
    md: {
      px: 4,
      py: 3,
      fontSize: 'sm',
    },
    lg: {
      w: '15rem',
      py: 3,
      fontSize: 'sm',
    },
    xl: {
      w: '32.5rem',
      py: 3,
      fontSize: 'sm',
    },
  },
  defaultProps: {
    size: 'sm',
    colorScheme: 'white',
  },
});
