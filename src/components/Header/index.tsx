import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';

// Utils
import { formatBreadcrumb } from '@/utils';

// Icons
import { BreadcrumbIcon, NotifyIcon } from '@/components/Icons';

const Header = ({ ...props }) => {
  // TODO: Fake data breadcrumb
  const pathname = '/users/create';
  const param = '/users/create';

  const renderBreadcrumb = useMemo(() => {
    const basePath = '/users/create';
    const paths = formatBreadcrumb(basePath);

    return paths.map(({ pathName, breadcrumbName }) => {
      const colorText = `/${pathName}` === pathname ? 'blue.300' : 'gray.500';
      return (
        <BreadcrumbItem key={pathName}>
          <Link to={pathName}>
            <Text fontSize="xs" color={colorText}>
              {breadcrumbName.replace(/\b\w/g, (l) => l.toUpperCase())}
            </Text>
          </Link>
        </BreadcrumbItem>
      );
    });
  }, [param, pathname]);

  return (
    <>
      <Flex
        bgColor="primary"
        maxW="full"
        px={10}
        py={7}
        justifyContent="space-between"
        {...props}
      >
        <Box>
          <Breadcrumb spacing="8px" separator={<BreadcrumbIcon />}>
            {renderBreadcrumb}
          </Breadcrumb>
        </Box>

        <Flex gap={3} alignItems="center">
          <NotifyIcon />
        </Flex>
      </Flex>

      <Heading py={5} px={10} as="h1" fontSize="lg" fontWeight="semibold">
        Users
      </Heading>
    </>
  );
};

export default memo(Header);
