import type { Meta, StoryObj } from '@storybook/react';

// Components
import BillForm from '.';

// Context
import { MultiFormProvider } from '@/context';

const meta = {
  title: 'Components/BillForm',
  component: BillForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="w-[1000px] flex justify-center p-9 bg-midNightBlue">
      <MultiFormProvider>
        <BillForm />
      </MultiFormProvider>
    </div>
  ),
} satisfies Meta<typeof BillForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
