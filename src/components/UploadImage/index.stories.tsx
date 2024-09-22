import type { Meta, StoryObj } from '@storybook/react';

// Components
import UploadImage from '.';

const meta = {
  title: 'Components/UploadImage',
  component: UploadImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[600px] bg-midNightBlue">
      <UploadImage {...args} />
    </div>
  ),
} satisfies Meta<typeof UploadImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFileChange: () => {},
  },
};
