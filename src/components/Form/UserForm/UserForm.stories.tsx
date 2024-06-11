import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import UserForm from '.';

const meta: Meta<typeof UserForm> = {
  title: 'Components/UserForm',
  tags: ['autodocs'],
  component: UserForm,
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
type Story = StoryObj<typeof UserForm>;

export const AddUser: Story = {
  args: {},
};

export const EditUser: Story = {
  args: {
    isEdit: true,
  },
};
