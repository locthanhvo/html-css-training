import { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types
import { IBoard } from '@/types';

// Services
import { getBoards } from '@/services';

// Hooks
import { useGetBoards } from '@/hooks/useBoard';

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
});

global.fetch = mockFetch;

jest.mock('@/services', () => ({
  getBoards: jest.fn(),
}));

describe('useBoard', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should return board data correctly', async () => {
    const mockResponse: IBoard[] = [
      {
        id: '93d1f6a8-c312-436a-886f-a646bf424209',
        title: 'Todo',
        color: 'electricPurple',
      },
    ];
    (getBoards as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetBoards(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.boards).toEqual(mockResponse);
    });
  });
});
