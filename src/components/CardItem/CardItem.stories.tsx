import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardItem from '.';

// Mocks
import { TASK_DETAIL } from '@/mocks';

export default {
  title: 'Components/CardItem',
  component: CardItem,
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

type Story = StoryObj<typeof CardItem>;

export const Default: Story = {
  args: {
    id: TASK_DETAIL.id,
    title: TASK_DETAIL.title,
    onClick: () => {},
  },
};
