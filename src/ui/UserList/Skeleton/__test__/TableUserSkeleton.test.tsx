import { render } from '@testing-library/react';

import TableUserSkeleton from '../TableUserSkeleton';

describe('TableUserSkeleton Component', () => {
  it('should render correctly', () => {
    const { container } = render(<TableUserSkeleton />);
    expect(container).toBeInTheDocument();
  });
});
