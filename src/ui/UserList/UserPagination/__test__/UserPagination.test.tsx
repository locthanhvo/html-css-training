import { render } from '@testing-library/react';
import UserPagination from '..';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({ replace: jest.fn() }),
}));

const renderSetup = () =>
  render(
    <UserPagination
      searchParams={{ page: 1, limit: 10, search: '' }}
      total={10}
    />,
  );

describe('UserPagination Component', () => {
  it('should render correctly', () => {
    const { container } = renderSetup();
    expect(container).toBeInTheDocument();
  });
});
