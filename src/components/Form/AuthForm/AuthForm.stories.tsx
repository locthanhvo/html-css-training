import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import AuthForm from '.';

const meta: Meta<typeof AuthForm> = {
  title: 'Components/AuthForm',
  tags: ['autodocs'],
  component: AuthForm,
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
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const SignIn: Story = {
  args: {},
};

export const SignUp: Story = {
  args: {
    isRegister: true,
  },
};
