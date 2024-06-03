import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import NavTab from '..';
import { Box } from '@chakra-ui/react';

describe('NavTab Component', () => {
  it('Should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <NavTab
          tabList={[
            {
              label: 'Company',
              component: <Box>Content</Box>,
            },
            {
              label: 'Setting Control',
              component: <Box>Content</Box>,
            },
          ]}
        />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
