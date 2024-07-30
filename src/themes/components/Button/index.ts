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

  variants: {
    primary: {
      bg: 'royalBlue',
      color: 'white',
      _hover: {
        bg: 'white',
        color: 'royalBlue',
        borderColor: 'royalBlue',
        border: '1px solid',
      },
    },
    secondary: {
      bg: 'none',
      color: 'primary',
      borderColor: 'primary',
      border: '1px solid',

      _hover: {
        bg: 'coolGray',
        color: 'white',
      },
    },
    ternary: {
      bg: 'white',
      color: 'lightRed',
      border: '1px solid',
      borderColor: 'lightRed',
      _hover: {
        bg: 'lightRed',
        color: 'white',
      },
    },
    outline: {
      border: 'none',
      color: 'primary',
      _hover: {
        bg: 'none',
      },
    },
  },

  defaultProps: {
    size: 'sm',
    variant: 'secondary',
  },
});
