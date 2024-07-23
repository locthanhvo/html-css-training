import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mocks
import { MOCK_BOARDS, MOCK_TASKS } from '@/mocks';

// Pages
import DashboardPage from '..';

const mockHandleCreateTask = jest.fn();
const mockUploadImages = jest.fn();

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
    handleEditTask: jest.fn(),
    isEditLoading: false,
    editedTask: MOCK_TASKS[0],
  }),

  useDeleteTask: () => ({
    handleDeleteTask: jest.fn(),
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
}));

describe('DashboardPage', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all tabs with correct labels and content', () => {
    const { getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>,
    );

    expect(getByText('Boards')).toBeInTheDocument();

    // Check for the Boards section rendering
    expect(queryByText('Todo')).toBeInTheDocument();
    expect(queryByText('In Work')).toBeInTheDocument();
    expect(queryByText('Review')).toBeInTheDocument();
    expect(queryByText('Done')).toBeInTheDocument();
  });
});
