import { Box } from '@chakra-ui/react';
import { render, RenderResult } from '@testing-library/react';

// Components
import NavTab from '..';

// Icons
import {
  BarChartIcon,
  CalendarIcon,
  ChecklistIcon,
  HamburgerMenuIcon,
  StatisticsIcon,
  BurgerMenuLeftIcon,
} from '@/components/common/Icons';

describe('NavTab Component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <NavTab
        tabList={[
          {
            label: 'List Tasks',
            component: <Box>Content</Box>,
            icon: ChecklistIcon,
          },
          {
            label: 'Boards',
            component: <Box>Boards Content</Box>,
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
      />,
    );
  });

  it('Should match snapshot', () => {
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  it('should render tab correctly', () => {
    const { getByText } = renderResult;

    getByText('Boards').click();

    expect(getByText('Boards Content')).toBeInTheDocument();
  });
});
