import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import HeaderList from '.';

// Mocks

export default {
  title: 'Components/HeaderList',
  component: HeaderList,
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

type Story = StoryObj<typeof HeaderList>;

export const Default: Story = {
  args: {
    title: 'to do',
    color: 'electricPurple',
    total: 2,
  },
};
