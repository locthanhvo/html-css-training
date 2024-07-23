import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
import { ITask } from '@/types';

// Services
import { deleteTask, getTask, getTasks, updateTask } from '@/services';

// Hooks
import {
  useCreateTask,
  useDeleteTask,
  useEditTask,
  useGetTask,
  useGetTasks,
} from '@/hooks/useTask';
import { TASK_DETAIL, TASK_DETAIL_2 } from '@/mocks';
import { taskQueryKeys } from '@/constants';

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
});

global.fetch = mockFetch;

jest.mock('@/services', () => ({
  getTasks: jest.fn(),
  createTasks: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  getTask: jest.fn(),
}));

describe('useTask', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return task data correctly', async () => {
    const mockResponse: ITask[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        label: [
          {
            name: 'Space Tasks 1',
            value: 'space-tasks-1',
          },
        ],
        title: 'Global Suns Network',
        description: 'description 2 \n description 3',
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
        startDate: '2024-07-01T00:00:00.000Z',
        endDate: '2024-07-10T00:00:00.000Z',
        boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
      },
    ];
    (getTasks as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetTasks(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockResponse);
    });
  });

  it('should invalidate queries on successful task creation', async () => {
    queryClient.invalidateQueries = jest.fn();

    const { result } = renderHook(() => useCreateTask(), {
      wrapper: wrapper,
    });

    await result.current.handleCreateTask({
      task: { ...TASK_DETAIL },
    });

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: [{ entity: 'list', scope: 'tasks' }],
      });
    });
  });

  it('should update query data on successful task update', async () => {
    const oldData = [{ ...TASK_DETAIL }, { ...TASK_DETAIL_2 }];
    (updateTask as jest.Mock).mockResolvedValue(TASK_DETAIL);
    queryClient.setQueryData = jest.fn();

    const setQueryDataSpy = jest.spyOn(queryClient, 'setQueryData');
    queryClient.getQueryData = jest.fn().mockReturnValue(oldData);

    const { result } = renderHook(() => useEditTask(), {
      wrapper,
    });

    await result.current.handleEditTask({ task: TASK_DETAIL });

    await waitFor(() => {
      expect(queryClient.setQueryData).toHaveBeenCalledWith(
        taskQueryKeys.lists(),
        expect.any(Function),
      );

      const updateFn = setQueryDataSpy.mock.calls[0][1] as (
        data: ITask[],
      ) => ITask[];
      const newData = updateFn(oldData);
      expect(newData).toEqual([TASK_DETAIL, { ...TASK_DETAIL_2 }]);
    });
  });

  it('should call handleDeleteTask function correctly', async () => {
    const mockId = '1';
    (deleteTask as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper,
    });

    await result.current.handleDeleteTask({
      id: mockId,
    });

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith({
        id: mockId,
      });
    });
  });

  it('should use initial data from the query cache', async () => {
    const mockResponse = { id: '12', title: 'New Brigade' };
    const oldData = [{ ...TASK_DETAIL }, { ...TASK_DETAIL_2 }];

    (getTask as jest.Mock).mockResolvedValue(mockResponse);

    queryClient.setQueryData(taskQueryKeys.lists(), oldData);

    const { result } = renderHook(() => useGetTask('4'), {
      wrapper,
    });

    expect(result.current.taskDetail).toEqual(undefined);

    await waitFor(() => !result.current.isDetailLoading);

    expect(result.current.taskDetail).toEqual(mockResponse);
    expect(getTask).toHaveBeenLastCalledWith({
      meta: undefined,
      queryKey: [{ entity: 'detail', id: '4', scope: 'tasks' }],
      signal: expect.any(AbortSignal),
    });
  });
});
