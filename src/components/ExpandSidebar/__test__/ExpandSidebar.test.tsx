import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ExpandSidebar from '..';

describe('ExpandSidebar Component', () => {
  it('Match ExpandSidebar component', () => {
    const element = render(
      <BrowserRouter>
        <ExpandSidebar />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
