import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Avatar from '..';

describe('Avatar Component', () => {
  it('Should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Avatar firstName="John" lastName="Doe" email="HbJjv@example.com" />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
