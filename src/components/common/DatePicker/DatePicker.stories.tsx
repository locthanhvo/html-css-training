import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Components
import DatePicker from '.';

// Types
import { TAddTaskForm } from '@/types';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} as Meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    variant: 'button',
  },

  render: function Render(props) {
    const { control } = useForm<TAddTaskForm>({});

    return <DatePicker {...props} control={control} />;
  },
};
