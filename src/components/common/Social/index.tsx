import { memo } from 'react';
import { Flex } from '@chakra-ui/react';

// Icons
import {
  BookIcon,
  EmailIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsappIcon,
} from '@/components/common/Icons';

const Social = () => (
  <Flex
    px={4}
    py={3}
    border="2px solid"
    justifyContent="space-between"
    alignItems="center"
    borderColor="lightGray"
    borderRadius="full"
  >
    <PhoneIcon />
    <EmailIcon color="#29CC39" />
    <BookIcon />
    <TelegramIcon />
    <WhatsappIcon />
  </Flex>
);

export default memo(Social);
