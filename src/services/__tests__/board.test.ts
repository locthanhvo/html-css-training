import { getBoards } from '@/services/board';

// Types
import { IBoard } from '@/types';

// Services
import { apiRequest } from '@/services';

// Constants
import { HTTP_METHOD, API_PATH } from '@/constants';

jest.mock('@/services', () => ({
  apiRequest: jest.fn(),
}));

describe('API Board functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBoards sends GET request correctly', async () => {
    const mockResponse: IBoard[] = [
      {
        id: '93d1f6a8-c312-436a-886f-a646bf424209',
        title: 'Todo',
        color: 'electricPurple',
      },
    ];
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getBoards();

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, API_PATH.BOARDS);
    expect(result).toEqual(mockResponse);
  });

  it('getBoards handles errors correctly', async () => {
    const mockError = new Error('Network Error');
    (apiRequest as jest.Mock).mockRejectedValue(mockError);

    await expect(getBoards()).rejects.toThrow('Network Error');

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, API_PATH.BOARDS);
  });
});
