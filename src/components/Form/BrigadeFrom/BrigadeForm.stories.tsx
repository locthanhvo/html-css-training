import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import BrigadeFrom from '.';

const meta: Meta<typeof BrigadeFrom> = {
  title: 'Components/BrigadeFrom',
  tags: ['autodocs'],
  component: BrigadeFrom,
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
type Story = StoryObj<typeof BrigadeFrom>;

export const AddControl: Story = {
  args: {},
};

export const EditControl: Story = {
  args: {
    title: 'Edit Brigade',
    isEdit: true,
  },
};
