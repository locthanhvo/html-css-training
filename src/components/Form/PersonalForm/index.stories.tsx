import type { Meta, StoryObj } from '@storybook/react';

// Components
import PersonalForm from '.';

// Context
import { MultiFormProvider } from '@/context';

const meta = {
  title: 'Components/PersonalForm',
  component: PersonalForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => (
    <div className="w-[1000px] flex justify-center p-9 bg-midNightBlue">
      <MultiFormProvider>
        <PersonalForm />
      </MultiFormProvider>
    </div>
  ),
} satisfies Meta<typeof PersonalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
