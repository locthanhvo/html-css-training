import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';

import EditTaskForm from '..';
import { TASK_DETAIL_2 } from '@/mocks';

describe('EditTaskForm', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();
  const mockRemove = jest.fn();
  let renderResult: RenderResult;

  const defaultProps = {
    task: TASK_DETAIL_2,
    isLoading: false,
    onSubmit: mockSubmit,
    onCancel: mockCancel,
    onRemove: mockRemove,
  };

  beforeEach(() => {
    renderResult = render(<EditTaskForm {...defaultProps} />);
    jest.clearAllMocks();
  });

  it('renders correctly with task props', () => {
    const { getByPlaceholderText, getByText, getAllByText } = renderResult;

    expect(getByPlaceholderText('Task name or type')).toBeInTheDocument();
    expect(getByText('Due Date')).toBeInTheDocument();
    expect(getByText('1 Days Left')).toBeInTheDocument();
    expect(getAllByText('Labels')[0]).toBeInTheDocument();
    expect(getAllByText('Members')[0]).toBeInTheDocument();
    expect(getByText('Attachments')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const { getByPlaceholderText, getByText } = renderResult;

    const titleInput = getByPlaceholderText('Task name or type');

    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

    const removeButton = getByText('Remove Card');

    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalled();
    });

    fireEvent.click(getByText('Save'));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  it('handles cancel button click', async () => {
    const { getByText } = renderResult;

    const cancelButton = getByText('Cancel');

    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(mockCancel).toHaveBeenCalled();
    });
  });

  it('displays days left correctly', () => {
    const { getByText } = renderResult;

    expect(getByText('1 Days Left')).toBeInTheDocument();
  });

  it('should render EditTaskForm empty data', () => {
    const { container } = render(
      <EditTaskForm
        isLoading={false}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
        onRemove={mockRemove}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
