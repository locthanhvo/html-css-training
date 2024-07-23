import { IUser } from './user';

export interface ITask {
  id: string;
  title?: string;
  label?: { name: string; value: string }[];
  members?: IUser[];
  images?: string[];
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  boardId: string;
}

export interface IListTask {
  id: string;
  title: string;
  total: number;
  color: string;
  tasks: ITask[];
}

export type TAddTaskForm = Omit<
  ITask,
  'updatedAt' | 'description' | 'members' | 'label'
>;

export type TEditTaskForm = Omit<ITask, 'createdAt'>;
