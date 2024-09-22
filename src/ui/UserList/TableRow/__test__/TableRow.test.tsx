import { render } from '@testing-library/react';

import TableRow from '..';

describe('TableRow Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <TableRow
        columns={[
          {
            title: 'Name',
            key: 'name',
            isSort: true,
          },
          {
            title: 'Phone',
            key: 'phone',
            isSort: true,
          },
          {
            title: 'Location',
            key: 'location',
            isSort: true,
          },
          {
            title: 'Company',
            key: 'company',
            isSort: true,
          },
          {
            title: 'Status',
            key: 'status',
            isSort: true,
          },
        ]}
      />,
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Phone')).toBeInTheDocument();
    expect(getByText('Location')).toBeInTheDocument();
    expect(getByText('Company')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
  });
});
