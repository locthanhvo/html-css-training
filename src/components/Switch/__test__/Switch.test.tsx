import { fireEvent, render } from '@testing-library/react';

// Components
import Switch from '..';

const mockOnChange = jest.fn();
const renderSetup = () => render(<Switch />);

describe('Switch Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('match Switch component', () => {
    const element = renderSetup();
    expect(element).toMatchSnapshot();
  });

  it('renders with initial value "email"', () => {
    const { getByText, getByRole } = render(
      <Switch value="in-app" onChange={mockOnChange} />,
    );
    const inAppInput = getByRole('checkbox');
    const inAppSpan = getByText(/email/i);

    fireEvent.click(inAppInput);

    expect(mockOnChange).toHaveBeenCalledWith(false);
    expect(inAppInput).toBeChecked();
    expect(inAppSpan).toHaveClass('text-white bg-primary');
  });
});
