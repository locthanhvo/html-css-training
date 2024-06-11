import { memo, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

interface TabProps {
  tabList: {
    label: string;
    component: JSX.Element;
  }[];
}

const NavTab = ({ tabList, ...rest }: TabProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs>
      <TabList maxW="fit-content">
        {tabList.map((tab, index) => (
          <Tab
            color={tabIndex === index ? 'blue.200' : 'gray.500'}
            fontSize="base"
            fontWeight="regular"
            key={tab.label}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels mt={4} {...rest}>
        {tabList.map((tab, index) => (
          <TabPanel key={tab.label}>
            {tabIndex === index && tab.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default memo(NavTab);
