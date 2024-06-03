import { Center, Spinner } from '@chakra-ui/react';

const Fallback = () => {
  return (
    <Center h='100%'>
      <Spinner size='xl' />
    </Center>
  );
};

export default Fallback;
