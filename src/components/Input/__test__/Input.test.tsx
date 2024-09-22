import { fireEvent, render } from '@testing-library/react';

// Components
import Input from '..';

describe('Input component', () => {
  it('renders the Search Box', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input placeholder="Search for..." leftIcon={<span>glasses</span>} />,
    );

    expect(getByPlaceholderText('Search for...')).toBeInTheDocument();
    expect(getByText('glasses')).toBeInTheDocument();
  });

  it('renders the Input with error', () => {
    const { getByText } = render(
      <Input
        isError
        errorMessage="Error message"
        label="Name"
        placeholder="John Carter"
      />,
    );
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Error message')).toBeInTheDocument();
  });

  it('handle onChange event', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Search for..."
        leftIcon={<span>glasses</span>}
        onChange={mockOnChange}
      />,
    );

    fireEvent.change(getByPlaceholderText('Search for...'), {
      target: { value: 'New Search' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
