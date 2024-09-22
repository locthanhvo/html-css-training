import { render } from '@testing-library/react';

import TableCell from '..';

describe('TableCell Component', () => {
  it('should render correctly', () => {
    const { getAllByText } = render(
      <TableCell cells={[{ key: 'name', content: 'John Doe' }]} />,
    );

    expect(getAllByText('John Doe')[0]).toBeInTheDocument();
  });
});
