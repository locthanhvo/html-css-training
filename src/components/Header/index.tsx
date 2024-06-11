import { memo, useMemo } from 'react';
import {
  Link,
  useLocation,
  useMatches,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

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
  const { pathname } = useLocation();
  const matches = useMatches();
  const param = useParams();

  const { title } =
    (useRouteLoaderData(matches.at(-1)?.id ?? pathname) as {
      title?: string;
    }) || {};

  const renderBreadcrumb = useMemo(() => {
    const basePath = Object.values(param).reduce<string>(
      (path, param) => path.replace('/' + param, ''),
      pathname,
    );
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
        {title}
      </Heading>
    </>
  );
};

export default memo(Header);
