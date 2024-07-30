import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Avatar from '..';

import AvatarLargeUrl from '@/assets/images/avatar-large-paul-doe.webp';

describe('Avatar Component', () => {
  it('should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Avatar url={AvatarLargeUrl} />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
