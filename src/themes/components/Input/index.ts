import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      borderRadius: 'lg',
      fontSize: 'xs',
      color: 'gray.900',

      _placeholder: {
        color: 'gray.400',
      },
    },
  },
});
