import type { Meta, StoryObj } from '@storybook/react';

// Components
import Input from '.';

// Icons
import { GlassesIcon } from '@/icons';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'John Carter',
  },
};

export const SearchInput: Story = {
  args: {
    leftIcon: <GlassesIcon />,
    placeholder: 'Search for...',
  },
};

export const HasError: Story = {
  args: {
    isError: true,
    errorMessage: 'Error message',
    placeholder: 'John Carter',
  },
};
