import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import EditTaskForm from '.';

const meta: Meta<typeof EditTaskForm> = {
  title: 'Components/EditTaskForm',
  tags: ['autodocs'],
  component: EditTaskForm,
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
type Story = StoryObj<typeof EditTaskForm>;

export const Default: Story = {
  args: {},
};
