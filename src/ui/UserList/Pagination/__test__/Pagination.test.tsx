import { render, RenderResult } from '@testing-library/react';

// Components
import Pagination from '..';
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

const useRouterMock = {
  replace: jest.fn(),
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => useRouterMock,
}));

describe('Pagination component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Pagination
        currentPage={DEFAULT_CURRENT_PAGE}
        pageSize={DEFAULT_PAGE_SIZE}
        total={100}
      />,
    );
  });
  it('renders the Pagination with children', () => {
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });
});
