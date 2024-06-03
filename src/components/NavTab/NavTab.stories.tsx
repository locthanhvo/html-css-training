import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import NavTab from '.';

const meta: Meta<typeof NavTab> = {
  title: 'Components/NavTab',
  component: NavTab,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavTab>;

export const Primary: Story = {
  args: {
    tabList: [
      {
        label: 'Company',
        component: <Box>Content</Box>,
      },
      {
        label: 'Setting Control',
        component: <Box>Content</Box>,
      },
    ],
  },
};
