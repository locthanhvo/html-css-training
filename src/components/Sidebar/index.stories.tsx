import type { Meta, StoryObj } from '@storybook/react';

// Components
import Sidebar from '.';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },

  render: () => (
    <div className="w-[300px]">
      <Sidebar />
    </div>
  ),
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
