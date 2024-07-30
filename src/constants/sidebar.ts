import {
  BuildingIcon,
  WorldIcon,
  CompassIcon,
  MessageIcon,
  StarIcon,
  StatisticsIcon,
} from '@/components/common/Icons';

import AvatarUserOne from '@/assets/images/avatar-medium-paul-doe.webp';
import AvatarUserTwo from '@/assets/images/avatar-medium-mary-alex.webp';
import AvatarUserThree from '@/assets/images/avatar-medium-jack-rice.webp';
import AvatarUserFour from '@/assets/images/avatar-medium-antony.webp';

export const SIDEBAR_MENU = [
  {
    title: 'Location',
    icon: CompassIcon,
  },
  {
    title: 'Star',
    icon: StarIcon,
  },
  {
    title: 'Message',
    icon: MessageIcon,
  },
  {
    title: 'Statistics',
    icon: StatisticsIcon,
  },
  {
    title: 'Earth',
    icon: WorldIcon,
  },
  {
    title: 'City',
    icon: BuildingIcon,
  },
];

export const SIDEBAR_USER_MENU = [
  {
    name: 'Mary',
    image: AvatarUserOne,
  },
  {
    name: 'Peter',
    image: AvatarUserTwo,
  },
  {
    name: 'Andrew',
    image: AvatarUserThree,
  },
  {
    name: 'Alex',
    image: AvatarUserFour,
  },
];
