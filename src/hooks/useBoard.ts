import { useQuery } from '@tanstack/react-query';

// Services
import { getBoards } from '@/services';

// Constants
import { boardQueryKeys } from '@/constants';

export const useGetBoards = () => {
  const { data: boards, isLoading: isBoardsLoading } = useQuery({
    queryKey: [...boardQueryKeys.lists()],
    queryFn: getBoards,
  });

  return { boards, isBoardsLoading };
};
