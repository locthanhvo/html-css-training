import { USER_SCHEMA } from '@/constants';

// Icons
import {
  BagIcon,
  MailIcon,
  MapPinIcon,
  PersonIcon,
  PhoneIcon,
  WebIcon,
} from '@/icons';

// Types
import { TDataSource, THeaderTable } from '@/types';

export const processTableData = (
  columns: THeaderTable[],
  dataSource: TDataSource[],
) => {
  return dataSource.map((data) => {
    return {
      id: data.id,
      cells: columns.map((column) => ({
        key: `${data.id}-${column.key}`,
        content: column.renderBody
          ? column.renderBody(data)
          : data[column.key as keyof typeof data],
        tooltipLabel: data[column.key as keyof typeof data],
      })),
    };
  });
};

export const basicFormFields = [
  {
    label: 'Phone',
    key: 'phone',
    name: 'phone',
    rules: USER_SCHEMA.PHONE,
    ariaLabel: 'phone',
    icon: PhoneIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter phone',
  },
  {
    label: 'Position',
    key: 'position',
    name: 'position',
    rules: USER_SCHEMA.POSITION,
    ariaLabel: 'position',
    icon: BagIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter position',
  },
  {
    label: 'Location',
    key: 'location',
    name: 'location',
    rules: USER_SCHEMA.LOCATION,
    ariaLabel: 'location',
    icon: MapPinIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter location',
  },
  {
    label: 'Website',
    key: 'website',
    name: 'website',
    rules: USER_SCHEMA.WEBSITE,
    ariaLabel: 'website',
    icon: WebIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter website',
  },
  {
    label: 'Company',
    key: 'company',
    name: 'company',
    rules: USER_SCHEMA.POSITION,
    ariaLabel: 'company',
    icon: BagIcon,
    customClass: 'py-6',
    placeholder: 'Please enter company',
  },
];

export const teamFormFields = [
  {
    label: 'Team Name',
    key: 'teamName',
    name: 'teamName',
    rules: USER_SCHEMA.TEAM_NAME,
    ariaLabel: 'teamName',
    icon: PhoneIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter team name',
  },
  {
    label: 'Rank',
    key: 'rank',
    name: 'rank',
    rules: USER_SCHEMA.RANK,
    ariaLabel: 'rank',
    icon: BagIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter rank',
  },
  {
    label: 'Office',
    key: 'office',
    name: 'office',
    rules: USER_SCHEMA.OFFICE,
    ariaLabel: 'office',
    icon: MapPinIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter office',
  },
  {
    label: 'mail',
    key: 'teamMail',
    name: 'teamMail',
    rules: USER_SCHEMA.EMAIL,
    ariaLabel: 'teamMail',
    icon: WebIcon,
    customClass: 'pt-6',
    placeholder: 'Please enter mail',
  },
];

export const personalFormFields = [
  {
    label: 'Full name',
    key: 'name',
    name: 'name',
    rules: USER_SCHEMA.NAME,
    ariaLabel: 'name',
    icon: PersonIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter name',
  },
  {
    label: 'Email address',
    key: 'email',
    name: 'email',
    rules: USER_SCHEMA.EMAIL,
    ariaLabel: 'email',
    icon: MailIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter email',
  },
];

export const billFormFields = [
  {
    label: 'Full name',
    key: 'billName',
    name: 'billName',
    rules: USER_SCHEMA.NAME,
    ariaLabel: 'billName',
    icon: PersonIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter full name',
  },
  {
    label: 'Address',
    key: 'billAddress',
    name: 'billAddress',
    rules: USER_SCHEMA.EMAIL,
    ariaLabel: 'billAddress',
    icon: MailIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter address',
  },
  {
    label: 'State',
    key: 'state',
    name: 'state',
    rules: USER_SCHEMA.EMAIL,
    ariaLabel: 'state',
    icon: MailIcon,
    customClass: 'py-6 border-b border-slateBlue',
    placeholder: 'Please enter state',
  },
  {
    label: 'Zip Code',
    key: 'zipCode',
    name: 'zipCode',
    rules: USER_SCHEMA.EMAIL,
    ariaLabel: 'zipCode',
    icon: MailIcon,
    customClass: 'pt-6',
    placeholder: 'Please enter zip code',
  },
];

export const generalFormFields = [
  {
    label: 'I’m mentioned in a message',
    key: 'mentionMessage',
    name: 'mentionMessage',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'Someone replies to any message',
    key: 'replyMessage',
    name: 'replyMessage',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'I’m assigned a task',
    key: 'assignTask',
    name: 'assignTask',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'A task is overdue',
    key: 'taskOverdue',
    name: 'taskOverdue',
    customClass: 'flex items-center justify-between text-xs',
  },
];

export const summaryFormFields = [
  {
    label: 'Daily summary',
    key: 'dailySummary',
    name: 'dailySummary',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'Weekly summary',
    key: 'weeklySummary',
    name: 'weeklySummary',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'Monthly summary',
    key: 'monthlySummary',
    name: 'monthlySummary',
    customClass: 'flex items-center justify-between text-xs',
  },
  {
    label: 'Annually summary',
    key: 'annuallySummary',
    name: 'annuallySummary',
    customClass: 'flex items-center justify-between text-xs',
  },
];
