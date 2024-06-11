import { NavTab } from '@/components';
import { ControlSettingSection } from '@/sections';
import { Box } from '@chakra-ui/react';
import { lazy, memo } from 'react';

// Components
const CompanySection = lazy(() => import('@/sections/CompanySection'));

const ControlPage = () => {
  return (
    <NavTab
      tabList={[
        {
          label: 'Company',
          component: (
            <Box p={8} bgColor="white" borderColor="gray.200" borderRadius="lg">
              <CompanySection />
            </Box>
          ),
        },
        {
          label: 'Setting Controls',
          component: <ControlSettingSection />,
        },
      ]}
    />
  );
};

export default memo(ControlPage);
