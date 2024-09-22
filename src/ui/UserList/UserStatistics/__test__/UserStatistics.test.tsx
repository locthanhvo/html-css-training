import { render } from '@testing-library/react';
import UserStatistics from '..';

describe('UserStatistics Component', () => {
  it('renders the user statistics correctly', () => {
    const { container } = render(
      <UserStatistics total={0} new={0} top={0} other={0} />,
    );

    expect(container).toBeInTheDocument();
  });
});
