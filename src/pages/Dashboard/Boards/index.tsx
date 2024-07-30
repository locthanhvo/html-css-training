import { VStack } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

// Types
import { IListTask, ITask, TAddTaskForm, TEditTaskForm } from '@/types';

// Components
import { CardList } from '@/components';
import Modal from '@/components/common/Modal';
import { EditTaskForm } from '@/components/Form';

// Hooks
import {
  useGetTasks,
  useGetBoards,
  useCreateTask,
  useUploadImages,
  useEditTask,
  useDeleteTask,
  useGetTask,
} from '@/hooks';
import Loading from '@/components/common/Loading';

const Boards = () => {
  // States
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<IListTask[]>([]);
  const [taskId, setTaskId] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Refs
  const actionItem = useRef<IListTask | null>(null);

  // Hooks
  const { boards } = useGetBoards();
  const { tasks } = useGetTasks();
  const { handleCreateTask, isCreateTaskLoading } = useCreateTask();
  const { handleEditTask, isEditLoading } = useEditTask();
  const { handleDeleteTask, isDeleteLoading } = useDeleteTask();
  const { taskDetail, isDetailLoading } = useGetTask(taskId);
  const { uploadImages, isLoadingUploadImages } = useUploadImages();

  const handleOpenAddTask = useCallback(
    (id: string) => {
      actionItem.current = { id } as IListTask;
      setActiveTaskId((prevId) => (prevId === id ? null : id));
    },
    [setActiveTaskId],
  );

  const handleToggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, [setIsOpenModal]);

  const handleOnClickTask = useCallback(
    (id: string) => {
      setTaskId(id);
      handleToggleModal();
    },
    [setTaskId, handleToggleModal],
  );

  useEffect(() => {
    if (boards?.length) {
      const taskList = boards?.map((board) => ({
        id: board.id,
        title: board.title,
        color: board.color,
        total: tasks?.filter((task: ITask) => task.boardId === board.id).length,
        tasks: tasks?.filter((task: ITask) => task.boardId === board.id),
      }));

      setTaskList(taskList as IListTask[]);
    }
  }, [boards, tasks, setTaskList]);

  const handleAddTask = useCallback(
    async (data: TAddTaskForm, imageFiles?: File[]) => {
      const payload: TAddTaskForm = {
        ...data,
        boardId: actionItem.current?.id ?? '',
      };

      if (imageFiles?.length) {
        const urls = await uploadImages(imageFiles);
        payload.images = urls;
      }

      await handleCreateTask({ task: payload });
      handleOpenAddTask(actionItem.current?.id ?? '');
    },
    [uploadImages, handleCreateTask, handleOpenAddTask],
  );

  const handleUpdateTask = useCallback(
    async (data: TEditTaskForm, imageFiles?: File[]) => {
      const payload: TEditTaskForm = {
        ...data,
      };

      if (imageFiles?.length) {
        const urls = await uploadImages(imageFiles);
        payload.images = urls;
      }

      await handleEditTask({ task: payload });
      handleToggleModal();
    },
    [uploadImages, handleEditTask, handleOpenAddTask],
  );

  const handleDelete = useCallback(async () => {
    if (taskId) {
      await handleDeleteTask({ id: taskId });
      handleToggleModal();
    }
  }, [taskId, handleDeleteTask, handleToggleModal]);

  const handleTaskDrop = useCallback(
    async (taskId: string, targetListId: string) => {
      tasks?.forEach(async (task) => {
        if (task.id === taskId) {
          await handleEditTask({
            task: {
              ...task,
              boardId: targetListId,
            },
          });
        }
      });
    },
    [tasks, handleEditTask],
  );

  return (
    <VStack p={10} flexDirection="row" gap={8} alignItems="">
      {taskList.map((board) => (
        <CardList
          isLoading={isCreateTaskLoading || isLoadingUploadImages}
          key={board.id}
          taskList={board}
          isActive={activeTaskId === board.id}
          onSubmit={handleAddTask}
          onOpenAddTask={handleOpenAddTask}
          onClick={handleOnClickTask}
          onTaskDrop={handleTaskDrop}
        />
      ))}

      {isOpenModal && taskId && (
        <Modal
          maxW="720px"
          isOpen={isOpenModal}
          onClose={handleToggleModal}
          body={
            isDetailLoading ? (
              <Loading />
            ) : (
              <EditTaskForm
                task={taskDetail}
                isDeleteLoading={isDeleteLoading}
                isLoading={isEditLoading || isLoadingUploadImages}
                onSubmit={handleUpdateTask}
                onCancel={handleToggleModal}
                onRemove={handleDelete}
              />
            )
          }
        />
      )}
    </VStack>
  );
};

export default memo(Boards);
