import { UseToastOptions } from '@chakra-ui/react';

// Constants
import { SHOW_TIME_TOAST, TOAST_STATUS } from '@/constants';

export const customToast = ({
  title,
  description,
  status,
}: {
  title?: string;
  description?: string;
  status?: TOAST_STATUS;
}) =>
  ({
    title: title,
    description: description,
    status: status,
    duration: SHOW_TIME_TOAST,
    isClosable: true,
  }) as UseToastOptions;
