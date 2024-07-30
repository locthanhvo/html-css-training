import { memo, useCallback, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';

// Types
import { IIconProps } from '@/types';

// Components
import InputField from '@/components/common/InputField';

// Icons
import { SearchIcon } from '@/components/common/Icons';

interface TabProps {
  tabList?: {
    label: string;
    component: JSX.Element;
    icon: React.MemoExoticComponent<
      ({ w, h, color }: IIconProps) => JSX.Element
    >;
  }[];
}

const NavTab = ({ tabList, ...rest }: TabProps) => {
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange = useCallback(
    (index: number) => {
      setTabIndex(index);
    },
    [setTabIndex],
  );

  return (
    <Tabs index={tabIndex} onChange={handleTabChange}>
      <Flex
        mr={5}
        borderBottom="2px solid"
        borderColor="lightGray"
        alignItems="center"
        justifyContent="space-between"
      >
        <TabList maxW="full" border="none">
          {tabList?.map((tab, index) => {
            const { label, icon: Icon } = tab;
            return (
              <Tab
                p={5}
                gap={2}
                color={tabIndex === index ? 'royalBlue' : 'secondary'}
                fontSize="base"
                key={tab.label}
                onClick={() => handleTabChange(index)}
              >
                <Icon color={tabIndex === index ? 'royalBlue' : '#C3CAD9'} />
                {label}
              </Tab>
            );
          })}
        </TabList>

        <Flex>
          <InputField
            leftIcon={<SearchIcon />}
            placeholder="Search Tasks"
            borderRadius="3xl"
            variant="secondary"
            size="lg"
            w={220}
          />
        </Flex>
      </Flex>

      <TabPanels mt={4} {...rest}>
        {tabList?.map((tab, index) => (
          <TabPanel key={tab.label}>
            {tabIndex === index && tab.component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default memo(NavTab);
