import { memo } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Constants
import { SIDEBAR_LIST } from '@/constants';

// Components
import Menu from './Menu';

// Icons
import { BrandIcon } from '@/components/Icons';

// Images
import sidebarImage from '@/assets/images/sidebar-image.png';
import Avatar from '../Avatar';
import { TUser } from '@/types';

interface ExpandSidebarProps {
  user: TUser;
}

const ExpandSidebar = ({ user }: ExpandSidebarProps) => {
  const { firstName, lastName, email } = user;
  return (
    <>
      <VStack w="265px" h="100vh" gap={0} bgColor="blue.500">
        <Box w="full" p={4}>
          <Link to="/">
            <BrandIcon />
          </Link>
        </Box>

        <VStack bgImage={`url(${sidebarImage})`} w="full" h="full">
          <Flex
            w="full"
            h="full"
            direction="column"
            p={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex w="full" direction="column" gap={4}>
              {SIDEBAR_LIST.map(({ id, leftIcon, title, paths }) => (
                <Menu
                  key={id}
                  leftIcon={leftIcon}
                  title={title}
                  paths={paths}
                />
              ))}
            </Flex>

            <Avatar firstName={firstName} lastName={lastName} email={email} />
          </Flex>
        </VStack>
      </VStack>
    </>
  );
};

export default memo(ExpandSidebar);
