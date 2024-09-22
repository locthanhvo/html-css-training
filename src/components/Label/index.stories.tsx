import type { Meta, StoryObj } from '@storybook/react';

// Components
import Label from '.';

// Icons
import { PencilIcon } from '@/icons';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Name',
  },
};

export const Medium: Story = {
  args: {
    name: 'Email',
    endIcon: <PencilIcon />,
  },
};
