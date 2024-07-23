import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mocks
import { MOCK_BOARDS, MOCK_TASKS } from '@/mocks';

// Sections
import Boards from '..';
import userEvent from '@testing-library/user-event';

const mockHandleCreateTask = jest.fn();
const mockUploadImages = jest.fn();
const mockHandleEditTask = jest.fn();
const mockHandleDeleteTask = jest.fn();
const mockGetData = jest.fn().mockImplementation((key) => {
  if (key === 'taskId') {
    return '550e8400-e29b-41d4-a716-446655440000';
  }
  return '';
});

jest.mock('@/hooks', () => ({
  useGetBoards: () => ({
    boards: MOCK_BOARDS,
  }),

  useCreateTask: () => ({
    handleCreateTask: mockHandleCreateTask,
    isCreateTaskLoading: false,
  }),

  useGetTasks: () => ({
    tasks: MOCK_TASKS,
  }),

  useEditTask: () => ({
    handleEditTask: mockHandleEditTask,
    isEditLoading: false,
    editedTask: MOCK_TASKS[0],
  }),

  useDeleteTask: () => ({
    handleDeleteTask: mockHandleDeleteTask,
    isDeleteLoading: false,
  }),

  useGetTask: () => ({
    taskDetail: MOCK_TASKS[0],
    isDetailLoading: false,
  }),

  useUploadImages: () => ({
    uploadImages: mockUploadImages,
    isPending: false,
  }),

  useUploader: () => ({
    imageFiles: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
  }),
}));

describe('BoardsSection', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Boards component with task lists', () => {
    const { getByText, getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    expect(getByText('Todo')).toBeInTheDocument();
    expect(getByText('In Work')).toBeInTheDocument();
    expect(getByText('Review')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();

    expect(getAllByText('Global Suns Network').length).toBe(1);
    expect(getAllByText('Make Money Online Though').length).toBe(1);
    expect(getAllByText('Characteristics Of A Successful').length).toBe(1);
  });

  it('should render AddTaskButton component with correct props', async () => {
    const { getAllByRole, getByPlaceholderText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    const addBtn = getAllByRole('button', { name: '+ new task' })[0];

    await userEvent.click(addBtn);

    const taskInput = getByPlaceholderText('Task name or type');
    fireEvent.change(taskInput, { target: { value: 'Company ABC' } });

    await userEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(mockHandleCreateTask).toHaveBeenCalled());
  });

  it('handleToggleModal opens and closes modal', async () => {
    const { getByText, findByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    const taskItem = getByText('Global Suns Network');
    await userEvent.click(taskItem);

    expect(await findByText('Global Suns Network')).toBeInTheDocument();

    const closeButton = getByText('Cancel');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        queryByText('description 2 \n description 3'),
      ).not.toBeInTheDocument();
    });
  });

  it('handleUpdateTask submits an edited task', async () => {
    const { getByText, getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    const taskItem = getByText('Global Suns Network');
    await userEvent.click(taskItem);

    const titleInput = getByPlaceholderText('Task name or type');
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });

    const submitButton = getByText('Save');

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockHandleEditTask).toHaveBeenCalled());
  });

  it('handleDelete remove a task', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    const taskItem = getByText('Characteristics Of A Successful');
    await userEvent.click(taskItem);

    const removeButton = getByText('Remove Card');
    await userEvent.click(removeButton);

    await waitFor(() => expect(mockHandleDeleteTask).toHaveBeenCalled());
  });

  it('should update the task with the correct boardId and call handleEditTask', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Boards />
      </QueryClientProvider>,
    );

    const dropEvent = {
      dataTransfer: {
        getData: mockGetData,
      },
      preventDefault: jest.fn(),
    };

    fireEvent.drop(getByText('Global Suns Network'), dropEvent);

    await waitFor(() => expect(mockHandleEditTask).toHaveBeenCalled());
  });
});
