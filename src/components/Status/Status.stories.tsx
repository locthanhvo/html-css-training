import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Status from '.';

// Constants
import { STATUS } from '@/constants';

export default {
  title: 'Components/Status',
  component: Status,
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

type Story = StoryObj<typeof Status>;

export const ValidStatus: Story = {
  args: { variant: STATUS.VALID },
};

export const ActiveStatus: Story = {
  args: { variant: STATUS.ACTIVE },
};

export const InActiveStatus: Story = {
  args: { variant: STATUS.INACTIVE },
};
