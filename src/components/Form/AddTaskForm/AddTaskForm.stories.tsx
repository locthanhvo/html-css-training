import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import AddTaskForm from '.';

const meta: Meta<typeof AddTaskForm> = {
  title: 'Components/AddTaskForm',
  tags: ['autodocs'],
  component: AddTaskForm,
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
};

export default meta;
type Story = StoryObj<typeof AddTaskForm>;

export const Default: Story = {
  args: {},
};
