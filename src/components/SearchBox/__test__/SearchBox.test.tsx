import { fireEvent, render } from '@testing-library/react';

// Components
import SearchBox from '..';

const renderSetup = () => render(<SearchBox />);

const mockReplace = jest.fn();
const mockURLSearchParams = {
  page: '1',
  search: '',
};

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
  useSearchParams: jest.fn(() => new URLSearchParams(mockURLSearchParams)),
}));

describe('SearchBox Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('match SearchBox component', () => {
    const element = renderSetup();
    expect(element).toMatchSnapshot();
  });

  it('sets search input value from URL search params', () => {
    const { getByPlaceholderText } = renderSetup();

    const input = getByPlaceholderText('Search for...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'John' } });

    expect(input.value).toBe('John');
  });
});
