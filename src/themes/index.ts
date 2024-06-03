import { extendTheme } from '@chakra-ui/react';
import { foundations } from '@/themes/base';
import { components } from '@/themes/components';

export const theme = extendTheme({
  ...foundations,
  components,
});
