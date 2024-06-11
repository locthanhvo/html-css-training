import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import ControlForm from '.';

const meta: Meta<typeof ControlForm> = {
  title: 'Components/ControlForm',
  tags: ['autodocs'],
  component: ControlForm,
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
type Story = StoryObj<typeof ControlForm>;

export const AddControl: Story = {
  args: {},
};

export const EditControl: Story = {
  args: {
    title: 'Edit Control Teams',
    isEdit: true,
  },
};
