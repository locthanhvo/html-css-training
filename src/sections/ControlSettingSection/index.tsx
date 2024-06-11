import { Grid } from '@chakra-ui/react';
import { memo } from 'react';

// Sections
import BrigadesSection from '@/sections/ControlSettingSection/Brigades';
import ControlTeamsSection from '@/sections/ControlSettingSection/ControlTeams';
import ListOfStagecoachesSection from '@/sections/ControlSettingSection/ListOfStagecoaches';
import MemberOfCrca from '@/sections/ControlSettingSection/MemberOfCrca';

const ControlSettingSection = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
      <BrigadesSection />
      <ControlTeamsSection />
      <ListOfStagecoachesSection />
      <MemberOfCrca />
    </Grid>
  );
};

export default memo(ControlSettingSection);
