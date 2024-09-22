import { render } from '@testing-library/react';

import CardSummarySkeleton from '../CardSummarySkeleton';

describe('CardSummarySkeleton Component', () => {
  it('should render correctly', () => {
    const { container } = render(<CardSummarySkeleton />);
    expect(container).toBeInTheDocument();
  });
});
