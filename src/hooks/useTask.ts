import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Services
import {
  createTasks,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/services';

// Constants
import { taskQueryKeys } from '@/constants';
import { ITask } from '@/types';

export const useGetTasks = () => {
  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: [...taskQueryKeys.lists()],
    queryFn: getTasks,
  });

  return { tasks, isTasksLoading };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { isPending: isCreateTaskLoading, mutateAsync: handleCreateTask } =
    useMutation({
      mutationFn: createTasks,
      onSuccess: (newTask) =>
        queryClient.setQueryData(taskQueryKeys.lists(), (oldData: ITask[]) => [
          ...oldData,
          newTask,
        ]),
    });

  return { isCreateTaskLoading, handleCreateTask };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { isPending: isEditLoading, mutateAsync: handleEditTask } = useMutation(
    {
      mutationFn: updateTask,
      onSuccess: (updatedTask) => {
        queryClient.setQueryData(
          taskQueryKeys.detail(updatedTask.id),
          updatedTask,
        );

        return queryClient.setQueryData(
          taskQueryKeys.lists(),
          (oldData: ITask[]) =>
            oldData.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
        );
      },
    },
  );

  return { isEditLoading, handleEditTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: handleDeleteTask,

    isPending: isDeleteLoading,
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: taskQueryKeys.lists(),
      }),
  });

  return { handleDeleteTask, isDeleteLoading };
};

export const useGetTask = (id: string) => {
  const queryClient = useQueryClient();
  const { data: taskDetail, isFetching: isDetailLoading } = useQuery({
    queryKey: taskQueryKeys.detail(id),
    queryFn: getTask,
    initialData: () =>
      queryClient
        .getQueryData<ITask[]>(taskQueryKeys.lists())
        ?.find((task) => task.id === id),
    staleTime: 10 * (60 * 100),
    gcTime: 15 * (60 * 1000),
    enabled: !!id,
  });

  return { taskDetail, isDetailLoading };
};
