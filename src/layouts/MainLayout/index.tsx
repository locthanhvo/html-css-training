import { memo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

// Components
import { Header, Sidebar } from '@/components';

const MainLayout = () => {
  return (
    <Flex w="100dvw" h="100dvh" bgColor="ghostWhite" direction="column">
      <Header w="full" />

      <Flex flex={1} w="full" alignItems="stretch">
        <Sidebar />

        <Box flex={1} p={7} bgColor="ghostWhite">
          <Box
            h="full"
            border="2px solid"
            borderColor="lightGray"
            borderRadius="2xl"
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default memo(MainLayout);
