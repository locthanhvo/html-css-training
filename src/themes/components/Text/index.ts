import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'coolBlue',
  },

  sizes: {
    sm: {
      fontSize: 'sm',
      lineHeight: 5,
    },
    base: {
      fontSize: 'base',
      lineHeight: 5,
    },
    md: {
      fontSize: 'md',
      lineHeight: 6,
    },
    lg: {
      fontSize: 'lg',
      lineHeight: 7,
    },
    xl: {
      fontSize: 'xl',
      lineHeight: 8,
    },
  },

  defaultProps: {
    size: 'base',
  },
});
