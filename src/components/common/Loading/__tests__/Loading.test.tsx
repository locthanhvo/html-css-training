import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Loading from '..';

describe('Loading Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Loading />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
