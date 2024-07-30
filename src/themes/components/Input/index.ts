import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      fontSize: 'base',
      color: 'dustyBlue',

      _placeholder: {
        color: 'coolGray',
      },
    },
  },

  variants: {
    primary: {
      field: {
        color: 'primary',
        border: '2px solid',
        borderColor: 'primary',
        _focus: {
          borderColor: 'royalBlue',
        },
      },
    },

    secondary: {
      field: {
        bgColor: 'white',
        _focus: {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'gray.200',
        },
        boxShadow: 'md',
      },
    },

    outline: {
      field: {
        border: 'none',
        color: 'primary',
      },
    },
  },
});
