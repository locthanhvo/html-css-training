import { fonts } from '@/themes/base/typography';
import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: fonts.body,
    fontWeight: 'normal',
    borderRadius: 'lg',
  },
  sizes: {
    sm: {
      w: '2.6875rem',
      px: 2,
      py: 2,
      fontSize: 'sm',
    },
    md: {
      w: '3.5rem',
      px: 4,
      py: 4,
      fontSize: 'base',
    },
  },
  defaultProps: {
    size: 'sm',
    colorScheme: 'white',
  },
});
