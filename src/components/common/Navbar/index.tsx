import { NAVBAR_LINKS } from '@/constants';
import { List, ListItem } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

// Components

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <List maxW="440px" display="flex" h="inherit">
      {NAVBAR_LINKS.map(({ name, path }) => (
        <ListItem
          key={name}
          w="110px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="md"
          color="secondary"
          {...(activePath === path && {
            color: 'steelBlue',
          })}
        >
          <Link to={path}>{name}</Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Navbar;
