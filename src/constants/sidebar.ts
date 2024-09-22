import {
  CardIcon,
  HomeIcon,
  IntegrateIcon,
  MoneyIcon,
  NotificationIcon,
  PencilIcon,
  PersonIcon,
  SettingsIcon,
  StarIcon,
  WebflowIcon,
} from '@/icons';
import { ROUTES } from './route';

export const SIDEBAR_MENU = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    leftIcon: HomeIcon,
    isRightIcon: true,
  },
  {
    name: 'Features',
    path: '/features',
    leftIcon: StarIcon,
    isRightIcon: true,
  },
  {
    name: 'Users',
    path: '/users',
    leftIcon: PersonIcon,
    isRightIcon: true,
    paths: [
      {
        id: 1,
        name: 'User List',
        destination: ROUTES.USER_LIST,
      },
      {
        id: 2,
        name: 'User Add',
        destination: ROUTES.PERSONAL_INFORMATION,
      },
    ],
  },
  {
    name: 'Pricing',
    path: '/pricing',
    leftIcon: MoneyIcon,
    isRightIcon: true,
  },
  {
    name: 'Integrations',
    path: '/integrations',
    leftIcon: IntegrateIcon,
    isRightIcon: true,
  },
];

export const SIDEBAR_MENU_SECOND = [
  {
    name: 'Settings',
    path: '/settings',
    leftIcon: SettingsIcon,
    isRightIcon: true,
  },
  {
    name: 'Template pages',
    path: '/template-pages',
    leftIcon: WebflowIcon,
    isRightIcon: true,
  },
];

export const NAVBAR_MENU = [
  {
    label: 'Personal Information',
    icon: PencilIcon,
    path: ROUTES.PERSONAL_INFORMATION,
  },
  {
    label: 'Team',
    icon: PersonIcon,
    path: ROUTES.TEAM,
  },
  {
    label: 'Billing',
    icon: CardIcon,
    path: ROUTES.BILLING,
  },
  {
    label: 'Notifications',
    icon: NotificationIcon,
    path: ROUTES.NOTIFICATION,
  },
];
