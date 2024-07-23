// Types
import { ITask, TAddTaskForm, TEditTaskForm } from '@/types';

// Services
import { apiRequest } from '@/services';

// Constants
import { API_PATH, HTTP_METHOD, taskQueryKeys } from '@/constants';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getTasks = async () => {
  return await apiRequest<ITask[]>(HTTP_METHOD.GET, API_PATH.TASKS);
};

export const createTasks = async ({ task }: { task: TAddTaskForm }) => {
  return await apiRequest<TAddTaskForm>(HTTP_METHOD.POST, API_PATH.TASKS, {
    ...task,
  });
};

export const updateTask = async ({ task }: { task: TEditTaskForm }) => {
  return await apiRequest<TEditTaskForm>(
    HTTP_METHOD.PUT,
    `${API_PATH.TASKS}/${task.id}`,
    {
      ...task,
    },
  );
};

export const deleteTask = async ({ id }: { id: string }) => {
  return await apiRequest<ITask>(HTTP_METHOD.DELETE, `${API_PATH.TASKS}/${id}`);
};

export const getTask = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof taskQueryKeys)['detail']>>) => {
  return await apiRequest<ITask>(HTTP_METHOD.GET, `${API_PATH.TASKS}/${id}`);
};
