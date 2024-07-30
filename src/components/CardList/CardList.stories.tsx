import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardList from '.';
import { MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND } from '@/mocks';

export default {
  title: 'Components/CardList',
  component: CardList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} as Meta;

type Story = StoryObj<typeof CardList>;

export const ListToDo: Story = {
  args: {
    taskList: {
      id: '1',
      title: 'to do',
      total: 2,
      color: 'electricPurple',
      tasks: [MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND],
    },
  },
};

export const ListInWork: Story = {
  args: {
    taskList: {
      id: '1',
      title: 'in work',
      total: 2,
      color: 'skyBlue',
      tasks: [MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND],
    },
  },
};

export const ListReview: Story = {
  args: {
    taskList: {
      id: '1',
      title: 'review',
      total: 2,
      color: 'yellow',
      tasks: [MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND],
    },
  },
};

export const ListDone: Story = {
  args: {
    taskList: {
      id: '1',
      title: 'to do',
      total: 2,
      color: 'green',
      tasks: [MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND],
    },
  },
};
