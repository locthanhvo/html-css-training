import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import MainLayout from '..';

describe('MainLayout Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
