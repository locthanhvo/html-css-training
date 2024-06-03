import { ThemeOverride } from '@chakra-ui/react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

export const fonts = {
  body: 'Inter, sans-serif',
  heading: 'Inter, sans-serif',
};

export const fontSizes: ThemeOverride['fontSizes'] = {
  '2xs': '0.75rem',
  xs: '0.875rem',
  base: '1rem',
  sm: '1.125rem',
  md: '1.25rem',
  lg: '2rem',
};

export const fontWeights: ThemeOverride['fontWeights'] = {
  regular: 400,
  medium: 500,
  semibold: 600,
};
