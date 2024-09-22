import type { Meta, StoryObj } from '@storybook/react';

// Components
import NotificationForm from '.';

// Context
import { MultiFormProvider } from '@/context';

const meta = {
  title: 'Components/NotificationForm',
  component: NotificationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (props) => (
    <div className="w-[1000px] flex justify-center p-9 bg-midNightBlue">
      <MultiFormProvider>
        <NotificationForm {...props} />
      </MultiFormProvider>
    </div>
  ),
} satisfies Meta<typeof NotificationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValues: {
      mentionMessage: 'email',
      replyMessage: 'email',
      assignTask: 'email',
      taskOverdue: 'in-app',
      dailySummary: 'in-app',
      weeklySummary: 'in-app',
      monthlySummary: 'in-app',
      annuallySummary: 'email',
    },
  },
};
