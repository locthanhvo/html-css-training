import { ComponentStyleConfig } from '@chakra-ui/react';

export const Menu: ComponentStyleConfig = {
  parts: ['item'],
  baseStyle: {
    item: {
      fontWeight: 'medium',
      lineHeight: 'normal',
      color: 'primary',
    },
  },

  sizes: {
    base: {
      item: {
        fontSize: '0.875rem',
        px: 3,
        py: 2,
      },
    },
  },

  variants: {
    ghost: {
      item: {
        bg: 'transparent',
        _hover: {
          bg: 'lightGray',
        },
      },
    },
  },

  defaultProps: {
    size: 'base',
    variant: 'ghost',
  },
};
