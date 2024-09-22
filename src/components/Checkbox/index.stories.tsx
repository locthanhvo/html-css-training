import type { Meta, StoryObj } from '@storybook/react';

// Components
import Checkbox from '.';
import { VisaIcon } from '@/icons';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[764px] h-[200px] flex justify-center items-center bg-midNightBlue">
      <div className="w-[500px]">
        <Checkbox {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'VISA **** 8092',
    content: 'Expires on 12/26',
    icon: <VisaIcon />,
    onChange: () => {},
  },
};
