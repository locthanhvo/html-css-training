import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddTaskForm from '..';

const mockOnSubmit = jest.fn();
const mockOnClose = jest.fn();

describe('AddTaskForm component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <AddTaskForm onSubmit={mockOnSubmit} onClose={mockOnClose} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onSubmit', async () => {
    const { getByRole, getByPlaceholderText } = render(
      <AddTaskForm
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        isLoading={false}
      />,
    );

    const taskInput = getByPlaceholderText('Task name or type');
    fireEvent.change(taskInput, { target: { value: 'Company ABC' } });

    await userEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
