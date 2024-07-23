import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardList from '.';
import { TASK_DETAIL, TASK_DETAIL_2 } from '@/mocks';

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

export const Default: Story = {
  args: {
    taskList: {
      id: '1',
      title: 'to do',
      total: 2,
      color: 'electricPurple',
      tasks: [{ ...TASK_DETAIL }, { ...TASK_DETAIL_2 }],
    },
  },
};
