import type { Meta, StoryObj } from '@storybook/react';

import AvatarUser from '@/images/avatars/avatar-user.webp';

// Components
import Avatar from '.';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: AvatarUser,
  },
};
