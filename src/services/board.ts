// Types
import { IBoard } from '@/types';

// Services
import { apiRequest } from '@/services';

// Constants
import { API_PATH, HTTP_METHOD } from '@/constants';

export const getBoards = async () => {
  return await apiRequest<IBoard[]>(HTTP_METHOD.GET, API_PATH.BOARDS);
};
