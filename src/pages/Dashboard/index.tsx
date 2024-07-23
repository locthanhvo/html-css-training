import { Box } from '@chakra-ui/react';

// Components
import { NavTab } from '@/components';

// Icons
import {
  BarChartIcon,
  BurgerMenuLeftIcon,
  CalendarIcon,
  ChecklistIcon,
  HamburgerMenuIcon,
  StatisticsIcon,
} from '@/components/common/Icons';

import Boards from '@/pages/Dashboard/Boards';

const DashboardPage = () => {
  return (
    <NavTab
      tabList={[
        {
          label: 'List Tasks',
          component: <Box>Content</Box>,
          icon: ChecklistIcon,
        },
        {
          label: 'Boards',
          component: <Boards />,
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
      ]}
    />
  );
};

export default DashboardPage;
