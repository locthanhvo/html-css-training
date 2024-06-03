import { memo } from 'react';
import { Box } from '@chakra-ui/react';

// Constants
import { STATUS } from '@/constants';

interface StatusProps {
  variant: STATUS;
}

const statusMapping = {
  [STATUS.VALID]: {
    bgColor: 'green.100',
    color: 'green.800',
  },
  [STATUS.ACTIVE]: {
    bgColor: 'orangeLight',
    color: 'brownSaddle',
  },
  [STATUS.INACTIVE]: {
    bgColor: 'red.100',
    color: 'red.800',
  },
};

const Status = ({ variant, ...props }: StatusProps) => {
  return (
    <Box
      w="67px"
      fontSize={'2xs'}
      px={2.5}
      py={0.5}
      borderRadius={10}
      textAlign="center"
      {...statusMapping[variant]}
      {...props}
    >
      {variant}
    </Box>
  );
};

export default memo(Status);
