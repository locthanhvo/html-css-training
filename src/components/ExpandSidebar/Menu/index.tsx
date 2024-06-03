import { Fragment, ReactElement, memo, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  UnorderedList,
  ListItem,
  Center,
  Flex,
} from '@chakra-ui/react';

// Icons
import { ArrowIcon } from '@/components/Icons';

interface SubMenuProps {
  id: number;
  name: string;
  destination: string;
}

interface ActiveIconProps {
  isExpanded?: boolean;
}

interface MenuProps {
  title?: string;
  paths: SubMenuProps[];
  leftIcon?: ({ isExpanded }: ActiveIconProps) => ReactElement;
}

const Menu = ({ title, paths, leftIcon }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const LeftIconComponent = leftIcon || Fragment;
  const location = useLocation();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderSubMenu = useMemo(() => {
    return paths.map(({ id, name, destination }) => {
      const isFocused = location.pathname === destination;
      return (
        <Link to={destination} key={id}>
          <ListItem w="216px">
            <Text
              px={7}
              py={2}
              ml={2}
              fontSize="base"
              color="primary"
              fontWeight="medium"
              _hover={{
                borderRadius: 'xl',
                color: 'primary',
                bgColor: 'blue.400',
              }}
              {...(isFocused && {
                borderRadius: 'xl',
                color: 'primary',
                bgColor: 'blue.400',
              })}
            >
              {name}
            </Text>
          </ListItem>
        </Link>
      );
    });
  }, [location, paths]);

  return (
    <Accordion w="full" mb={isExpanded ? 3 : 0} allowToggle>
      <AccordionItem border={0}>
        <AccordionButton p={0} w="full" display="flex" onClick={handleToggle}>
          <Flex w="full" alignItems="center" gap={3}>
            <Center borderRadius="xl">
              <LeftIconComponent isExpanded={isExpanded} />
            </Center>

            <Text
              fontSize="base"
              color={isExpanded ? 'primary' : 'gray'}
              fontWeight="medium"
            >
              {title}
            </Text>
          </Flex>

          <ArrowIcon isExpanded={isExpanded} rotate="180deg" />
        </AccordionButton>
        <AccordionPanel p={0}>
          <UnorderedList
            listStyleType="none"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {renderSubMenu}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(Menu);
