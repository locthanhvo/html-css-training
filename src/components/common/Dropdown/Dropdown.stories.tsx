import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Dropdown from '.';

// Constants
import { LABELS } from '@/constants';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
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

type Story = StoryObj<typeof Dropdown>;

export const DropdownDefault: Story = {
  args: { options: LABELS, name: 'Labels' },
};
