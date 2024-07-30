import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Header from '..';

describe('Header Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
