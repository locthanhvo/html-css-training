import {
  createTasks,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/services/task';

// Types
import { ITask, TAddTaskForm } from '@/types';

// Services
import { apiRequest } from '@/services/';

// Constants
import { HTTP_METHOD, API_PATH } from '@/constants';

// Mocks
import { TASK_DETAIL, TASK_DETAIL_2 } from '@/mocks';

jest.mock('@/services', () => ({
  apiRequest: jest.fn(),
  getTasks: jest.fn(),
  createTasks: jest.fn(),
}));

describe('API Task functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getTasks sends GET request correctly', async () => {
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
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getTasks();

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, API_PATH.TASKS);
    expect(result).toEqual(mockResponse);
  });

  it('getTasks handles errors correctly', async () => {
    const mockError = new Error('Network Error');
    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(getTasks()).rejects.toThrow('Network Error');

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, API_PATH.TASKS);
  });

  it('createTask sends POST request with correct data', async () => {
    const dataRequest: TAddTaskForm = {
      title: 'New task',
      boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
      id: 'hGuM0dS',
    };

    const mockResponse: TAddTaskForm = { ...dataRequest };
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createTasks({ task: dataRequest });

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.POST,
      API_PATH.TASKS,
      dataRequest,
    );
    expect(result).toEqual(mockResponse);
  });

  it('deleteTask sends DELETE request with correct ID', async () => {
    const id = 'some-id';
    const mockResponse = { id: 'some-id' };
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteTask({ id });

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.DELETE,
      `${API_PATH.TASKS}/${id}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it('deleteTask handles errors correctly', async () => {
    const id = 'some-id';
    const mockError = new Error('Network Error');
    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(deleteTask({ id })).rejects.toThrow('Network Error');

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.DELETE,
      `${API_PATH.TASKS}/${id}`,
    );
  });

  it('getTask sends GET request with correct ID', async () => {
    const id = 'some-id';
    const dataRequest = {
      title: 'New task',
      boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
      id: 'hGuM0dS',
    };
    (apiRequest as jest.Mock).mockResolvedValue(dataRequest);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getTask({
      queryKey: [
        {
          id,
          entity: 'detail',
          scope: 'brigades',
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATH.TASKS}/${id}`,
    );
    expect(result).toEqual(dataRequest);
  });

  it('getTask handles errors correctly', async () => {
    const id = 'some-id';
    const mockError = new Error('Network Error');
    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    await expect(
      getTask({
        queryKey: [
          {
            id,
            entity: 'detail',
            scope: 'brigades',
          },
        ],
        signal: signal as unknown as AbortSignal,
        meta: {},
      }),
    ).rejects.toThrow('Network Error');

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.GET,
      `${API_PATH.TASKS}/${id}`,
    );
  });

  it('updateTask sends PUT request with correct data', async () => {
    const mockResponse = { ...TASK_DETAIL };

    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await updateTask({ task: TASK_DETAIL });

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.PUT,
      `${API_PATH.TASKS}/${TASK_DETAIL.id}`,
      TASK_DETAIL,
    );
    expect(result).toEqual(mockResponse);
  });

  it('updateTask handles errors correctly', async () => {
    const mockError = new Error('Network Error');
    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(updateTask({ task: TASK_DETAIL_2 })).rejects.toThrow(
      'Network Error',
    );

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.PUT,
      `${API_PATH.TASKS}/${TASK_DETAIL_2.id}`,
      TASK_DETAIL_2,
    );
  });
});
