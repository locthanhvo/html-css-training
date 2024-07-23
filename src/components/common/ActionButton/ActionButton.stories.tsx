import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ActionButton from '.';

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

export const Default: Story = {
  args: {
    size: 'sm',
    title: 'Save',
    bgColor: 'royalBlue',
  },
};

export const EditButton: Story = {
  args: {
    size: 'md',
    title: 'Edit',
    bgColor: 'royalBlue',
  },
};

export const CancelButton: Story = {
  args: {
    size: 'md',
    title: 'Cancel',
    border: '1px solid',
    color: 'coolGray',
  },
};

export const DeleteButton: Story = {
  args: {
    size: 'md',
    title: 'Delete',
    border: '1px solid',
    color: 'lightRed',
  },
};
