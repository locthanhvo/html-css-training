import type { Meta, StoryObj } from '@storybook/react';

// Components
import TeamForm from '.';

// Context
import { MultiFormProvider } from '@/context';

const meta = {
  title: 'Components/TeamForm',
  component: TeamForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="w-[1000px] flex justify-center p-9 bg-midNightBlue">
      <MultiFormProvider>
        <TeamForm />
      </MultiFormProvider>
    </div>
  ),
} satisfies Meta<typeof TeamForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
