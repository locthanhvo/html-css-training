import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import Button from '.';

// Icons
import { ArrowRightIcon } from '@/icons';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Add User',
  },
};

export const Medium: Story = {
  args: {
    title: 'Add User',
    size: 'md',
    endIcon: <ArrowRightIcon />,
  },
};
