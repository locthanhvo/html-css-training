import {
  CalendarIcon,
  UserGroupIcon,
  BarChartIcon,
  EmailIcon,
  CloudIcon,
  ChecklistIcon,
  SettingIcon,
} from '@/components/common/Icons';

export const MENU_LIST = [
  {
    id: 1,
    title: 'Dashboard',
    path: '/dashboard',
    style: {
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: BarChartIcon,
  },

  {
    id: 2,
    title: 'Notes',
    path: '/notes',
    style: {
      borderLeft: '2px solid',
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: ChecklistIcon,
  },
  {
    id: 3,
    title: 'Tasks',
    path: '/tasks',
    style: {
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: ChecklistIcon,
  },
  {
    id: 4,
    title: 'Files',
    path: '/files',
    style: {
      borderLeft: '2px solid',
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: CloudIcon,
  },
  {
    id: 5,
    title: 'Emails',
    path: '/emails',
    style: {
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: EmailIcon,
  },
  {
    id: 6,
    title: 'Clients',
    path: '/clients',
    style: {
      borderLeft: '2px solid',
      borderBottom: '2px solid',
      borderColor: 'lightGray',
    },
    icon: UserGroupIcon,
  },
  {
    id: 7,
    title: 'Calendars',
    path: '/calendars',
    style: {
      borderColor: 'lightGray',
    },
    icon: CalendarIcon,
  },
  {
    id: 8,
    title: 'Settings',
    path: '/settings',
    style: {
      borderLeft: '2px solid',
      borderColor: 'lightGray',
    },
    icon: SettingIcon,
  },
];
