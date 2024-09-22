import type { Meta, StoryObj } from '@storybook/react';

import AvatarUser from '@/images/avatars/avatar-user.webp';

// Components
import CardItem from '.';

const meta = {
  title: 'Components/CardItem',
  component: CardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  render: (args) => (
    <div className="flex p-9 items-center  w-[600px] h-[200px] bg-black">
      <CardItem {...args} />
    </div>
  ),
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: AvatarUser,
    name: 'John Carter',
    email: '4Jpj5@example.com',
  },
};
