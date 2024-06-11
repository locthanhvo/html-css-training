import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ExpandSidebar from '..';

describe('ExpandSidebar Component', () => {
  it('Match ExpandSidebar component', () => {
    const element = render(
      <BrowserRouter>
        <ExpandSidebar
          user={{
            firstName: 'John',
            lastName: 'Doe',
            email: 'WqCk0@example.com',
            password: '123456',
          }}
        />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
