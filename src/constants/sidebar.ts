// Icons
import {
  ConfigIcon,
  DirectionIcon,
  FolderIcon,
  ProjectIcon,
  ProtectionIcon,
} from '@/components/Icons';

// Constants
import { PRIVATE_ROUTERS } from '@/constants/router';

export const SIDEBAR_LIST = [
  {
    id: 1,
    title: 'Configuration',
    leftIcon: ConfigIcon,
    paths: [
      {
        id: 1,
        name: 'Users',
        destination: PRIVATE_ROUTERS.USERS,
      },
      {
        id: 3,
        name: 'Bases',
        destination: PRIVATE_ROUTERS.BASES,
      },
      {
        id: 4,
        name: 'Controls',
        destination: PRIVATE_ROUTERS.CONTROLS,
      },
      {
        id: 5,
        name: 'Alerts',
        destination: PRIVATE_ROUTERS.ALERTS,
      },
      {
        id: 6,
        name: 'Roles',
        destination: PRIVATE_ROUTERS.ROLES,
      },
      {
        id: 7,
        name: 'Preferences',
        destination: PRIVATE_ROUTERS.PREFERENCES,
      },
      {
        id: 8,
        name: 'Calendar',
        destination: PRIVATE_ROUTERS.CALENDAR,
      },
    ],
  },
  {
    id: 2,
    title: 'File',
    leftIcon: FolderIcon,
    paths: [
      {
        id: 1,
        name: 'File',
        destination: PRIVATE_ROUTERS.USERS,
      },
    ],
  },
  {
    id: 3,
    title: 'Project',
    leftIcon: ProjectIcon,
    paths: [
      {
        id: 1,
        name: 'Project',
        destination: PRIVATE_ROUTERS.USERS,
      },
    ],
  },
  {
    id: 4,
    title: 'Technical Direction',
    leftIcon: DirectionIcon,
    paths: [
      {
        id: 1,
        name: 'Technical Direction',
        destination: PRIVATE_ROUTERS.USERS,
      },
    ],
  },
  {
    id: 5,
    title: 'Protection',
    leftIcon: ProtectionIcon,
    paths: [
      {
        id: 1,
        name: 'Protection',
        destination: PRIVATE_ROUTERS.USERS,
      },
    ],
  },
];
