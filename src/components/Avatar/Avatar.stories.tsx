import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Avatar from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
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

type Story = StoryObj<typeof Avatar>;

export const AvatarDefault: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'HbJjv@example.com',
  },
};
