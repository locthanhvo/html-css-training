import type { Meta, StoryObj } from '@storybook/react';

// Components
import Modal from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    isOpen: true,
    body: <p>Sample Modal</p>,
  },
};
