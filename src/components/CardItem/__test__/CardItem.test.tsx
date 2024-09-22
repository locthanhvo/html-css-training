import { render } from '@testing-library/react';

import AvatarUser from '@/images/avatars/avatar-user.webp';

// Components
import CardItem from '..';

describe('CardItem component', () => {
  it('renders the CardItem with children', () => {
    const { getByAltText, getByText } = render(
      <CardItem
        src={AvatarUser}
        name="John Carter"
        email="4Jpj5@example.com"
      />,
    );

    expect(getByText('John Carter')).toBeInTheDocument();
    expect(getByText('4Jpj5@example.com')).toBeInTheDocument();
    expect(getByAltText('avatar')).toBeInTheDocument();
  });
});
