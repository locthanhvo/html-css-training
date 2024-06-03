import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Header from '..';

describe('Header Component', () => {
  it('Match Header component', () => {
    const element = render(
      <BrowserRouter>
        <Header width="1140px" />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
