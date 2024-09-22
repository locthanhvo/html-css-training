import { render } from '@testing-library/react';
import SecondaryLayout from '..';

const useParamsMock = {
  id: '1',
};

const usePathnameMock = '/users/1/billing';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => useParamsMock,
  usePathname: () => usePathnameMock,
}));

describe('SecondaryLayout', () => {
  it('should render correctly', () => {
    const { container } = render(
      <SecondaryLayout>
        <div>SecondaryLayout</div>
      </SecondaryLayout>,
    );
    expect(container).toBeInTheDocument();
  });
});
