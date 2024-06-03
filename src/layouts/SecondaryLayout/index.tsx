import { LogoIcon } from '@/components/Icons';
import { PUBLIC_ROUTERS } from '@/constants';
import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const SecondaryLayout = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      maxW="520px"
      minH="100vh"
      m="0 auto"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={10}
      >
        <LogoIcon />
        <Text fontSize="md" fontWeight="medium">
          Please enter your{' '}
          {pathname.includes(PUBLIC_ROUTERS.SIGN_IN) ? 'sign in' : 'sign up'}{' '}
          information
        </Text>
      </Flex>
      <Outlet />
    </Flex>
  );
};

export default memo(SecondaryLayout);
