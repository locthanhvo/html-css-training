import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardItem from '.';

// Mocks
import { MOCK_TASK_DETAIL_FIRST, MOCK_TASK_DETAIL_SECOND } from '@/mocks';

const { id, title, images, description, label, startDate, endDate, members } =
  MOCK_TASK_DETAIL_SECOND;

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
    id: MOCK_TASK_DETAIL_FIRST.id,
    title: MOCK_TASK_DETAIL_FIRST.title,
    onClick: () => {},
  },
};

export const FullDetail: Story = {
  args: {
    id: id,
    title: title,
    images: images,
    description: description,
    label: label,
    startDate: startDate,
    endDate: endDate,
    members: members,
    onClick: () => {},
  },
};
