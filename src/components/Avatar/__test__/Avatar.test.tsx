import { render } from '@testing-library/react';

import AvatarUser from '@/images/avatars/avatar-user.webp';

// Components
import Avatar from '..';

describe('Avatar component', () => {
  it('renders the Avatar with children', () => {
    const { getByAltText } = render(<Avatar src={AvatarUser} />);
    expect(getByAltText('avatar')).toBeInTheDocument();
  });
});
