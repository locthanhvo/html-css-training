import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import UploadFile from '.';

export default {
  title: 'Components/UploadFile',
  component: UploadFile,
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

type Story = StoryObj<typeof UploadFile>;

export const Default: Story = {
  args: {},
};
