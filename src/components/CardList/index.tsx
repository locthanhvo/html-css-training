import { DragEvent, memo, useCallback, useMemo } from 'react';
import { Flex, VStack } from '@chakra-ui/react';

// Components
import HeaderList from '@/components/CardList/HeaderList';
import CardItem from '@/components/CardItem';
import ActionButton from '@/components/common/ActionButton';
import { AddTaskForm } from '@/components/Form';

// Types
import { IListTask, TAddTaskForm } from '@/types';

interface CardListProps {
  isLoading?: boolean;
  isActive?: boolean;
  taskList?: IListTask;
  onSubmit: (data: TAddTaskForm, imageFiles?: File[]) => void;
  onOpenAddTask?: (id: string) => void;
  onClick?: (id: string) => void;
  onTaskDrop: (taskId: string, targetListId: string) => void;
}

const CardList = ({
  isLoading = false,
  isActive = false,
  taskList,
  onOpenAddTask,
  onSubmit,
  onClick,
  onTaskDrop,
}: CardListProps) => {
  const { id = '', title, total, color, tasks } = taskList || {};

  const handleOpenAddTask = useCallback(() => {
    onOpenAddTask?.(id);
  }, []);

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, taskId: string) => {
      event.dataTransfer.setData('taskId', taskId);
      event.dataTransfer.setData('sourceListId', id.toString());
    },
    [id],
  );

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('taskId');

      onTaskDrop(taskId, id);
    },
    [id, onTaskDrop],
  );

  const memoizedTasks = useMemo(
    () =>
      tasks?.map((task) => {
        const {
          id,
          title,
          description,
          endDate,
          images,
          members,
          label,
          startDate,
        } = task;

        return (
          <CardItem
            key={task.id}
            id={id}
            title={title}
            description={description}
            label={label}
            startDate={startDate}
            endDate={endDate}
            images={images}
            members={members}
            onClick={onClick}
            onDragStart={handleDragStart}
          />
        );
      }),
    [tasks, onClick, handleDragStart],
  );

  return (
    <VStack
      gap={6}
      style={{ flexShrink: 0 }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <HeaderList
        title={title}
        total={total}
        color={color}
        onClick={handleOpenAddTask}
      />

      <Flex
        gap={6}
        direction="column"
        maxH={825}
        overflowY="scroll"
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {!!tasks?.length && memoizedTasks}

        {isActive && (
          <AddTaskForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            onClose={handleOpenAddTask}
          />
        )}
      </Flex>
      <ActionButton
        display={isActive ? 'none' : 'flex'}
        justifyContent="flex-start"
        textTransform="uppercase"
        title="+ new task"
        color="primary"
        w="full"
        border="none"
        fontSize="base"
        onClick={handleOpenAddTask}
      />
    </VStack>
  );
};

export default memo(CardList);
