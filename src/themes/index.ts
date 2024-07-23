import { extendTheme } from '@chakra-ui/react';

// Themes
import { bases } from '@/themes/base';
import { components } from '@/themes/components';

export const theme = extendTheme({
  ...bases,
  components,
});
