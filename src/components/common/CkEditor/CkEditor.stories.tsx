import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CkEditor from '.';

export default {
  title: 'Components/CkEditor',
  component: CkEditor,
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

type Story = StoryObj<typeof CkEditor>;

export const Default: Story = {
  args: {},
};
