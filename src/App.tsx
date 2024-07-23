import { ChakraProvider, UseToastOptions } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Theme
import { theme } from '@/themes';

// Router
import { router } from '@/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

const defaultOptions = {
  duration: 3000,
  position: 'top-right',
  isClosable: true,
} as UseToastOptions;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} toastOptions={{ defaultOptions }}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
