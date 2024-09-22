import { fireEvent, render } from '@testing-library/react';

// Components
import Textarea from '..';

describe('Textarea component', () => {
  it('renders the textarea', () => {
    const { getByText, getByPlaceholderText } = render(
      <Textarea
        placeholder="Description...."
        leftIcon={<span>glasses</span>}
      />,
    );

    expect(getByPlaceholderText('Description....')).toBeInTheDocument();
    expect(getByText('glasses')).toBeInTheDocument();
  });

  it('renders the Textarea with error', () => {
    const { getByText } = render(
      <Textarea
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
      <Textarea
        placeholder="Description...."
        leftIcon={<span>glasses</span>}
        onChange={mockOnChange}
      />,
    );

    fireEvent.change(getByPlaceholderText('Description....'), {
      target: { value: 'New Description' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
