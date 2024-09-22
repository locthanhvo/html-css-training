import { render } from '@testing-library/react';

// Components
import Navbar from '..';

const useParamsMock = {
  id: '1',
};

const usePathnameMock = '/users/1/billing';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => useParamsMock,
  usePathname: () => usePathnameMock,
}));

describe('Navbar Component', () => {
  it('match Navbar component', () => {
    const element = render(<Navbar />);

    expect(element).toMatchSnapshot();
  });

  it('check if path is not id', () => {
    useParamsMock.id = '';

    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
