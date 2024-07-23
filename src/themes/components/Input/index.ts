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
});
