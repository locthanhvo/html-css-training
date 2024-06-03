import { memo, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

interface TabProps {
  tabList: {
    label: string;
    component: JSX.Element;
  }[];
}

const TabLayout = ({ tabList }: TabProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs>
      <TabList maxW="578px">
        {tabList.map((tab, index) => (
          <Tab
            px={4}
            py={3}
            bgColor={tabIndex === index ? 'white' : ''}
            color={tabIndex === index ? 'blue.200' : 'gray.500'}
            fontSize="base"
            fontWeight="regular"
            key={index}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels bgColor="white" borderColor="gray.200">
        {tabList.map((tab, index) => (
          <TabPanel key={index}>{tabIndex === index && tab.component}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default memo(TabLayout);
