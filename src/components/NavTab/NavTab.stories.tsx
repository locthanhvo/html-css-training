import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import NavTab from '.';

// Icons
import {
  BarChartIcon,
  CalendarIcon,
  ChecklistIcon,
  HamburgerMenuIcon,
  StatisticsIcon,
  BurgerMenuLeftIcon,
} from '@/components/common/Icons';

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
        label: 'List Tasks',
        component: <Box>Content</Box>,
        icon: ChecklistIcon,
      },
      {
        label: 'Boards',
        component: <Box>Content 1</Box>,
        icon: BarChartIcon,
      },
      {
        label: 'Calendar',
        component: <Box>Content 1</Box>,
        icon: CalendarIcon,
      },
      {
        label: 'Gantt',
        component: <Box>Content 1</Box>,
        icon: BurgerMenuLeftIcon,
      },
      {
        label: 'Timeline',
        component: <Box>Content 1</Box>,
        icon: HamburgerMenuIcon,
      },
      {
        label: 'Activity',
        component: <Box>Content 1</Box>,
        icon: StatisticsIcon,
      },
    ],
  },
};
