import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ExpandSidebar from '.';

export default {
  title: 'Components/ExpandSidebar',
  component: ExpandSidebar,
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

type Story = StoryObj<typeof ExpandSidebar>;

export const SignInButton: Story = {
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'WqCk0@example.com',
      password: '123456',
    },
  },
};
