import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Sidebar from '..';

describe('Sidebar Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
