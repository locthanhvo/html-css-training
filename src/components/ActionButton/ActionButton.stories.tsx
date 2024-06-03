import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ActionButton from '.';

import { AddIcon, ForwardIcon } from '../Icons';

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
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

type Story = StoryObj<typeof ActionButton>;

export const SignInButton: Story = {
  args: {
    size: 'xl',
    title: 'Sign In',
    bgColor: 'blue.200',
    rightIcon: <ForwardIcon />,
  },
};

export const SignUpButton: Story = {
  args: {
    size: 'xl',
    title: 'Sign Up',
    bgColor: 'blue.200',
  },
};

export const AddUserButton: Story = {
  args: {
    size: 'lg',
    title: 'Add User',
    bgColor: 'blue.200',
    rightIcon: <AddIcon />,
  },
};

export const EditButton: Story = {
  args: {
    size: 'sm',
    title: 'Edit',
    bgColor: 'white',
    color: 'blue.100',
    borderColor: 'blue.100',
  },
};

export const DeleteButton: Story = {
  args: {
    size: 'sm',
    title: 'Delete',
    bgColor: 'red.900',
  },
};

export const CancelButton: Story = {
  args: {
    size: 'lg',
    title: 'Cancel',
    color: 'gray.500',
    borderColor: 'gray.300',
  },
};
