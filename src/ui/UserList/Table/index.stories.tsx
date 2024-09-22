import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '.';
import { Status } from '@/components';

// Icons
import {
  BinIcon,
  CheckboxIcon,
  LocationIcon,
  LockBoxIcon,
  PencilIcon,
  PersonIcon,
  PhoneIcon,
} from '@/icons';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="w-[764px] h-screen">
      <Table {...args} />
    </div>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Name',
        key: 'name',
        icon: <PersonIcon width={10} height={10} />,
        isSort: true,
      },
      {
        title: 'Phone',
        key: 'phone',
        icon: <PhoneIcon />,
        isSort: true,
      },
      {
        title: 'Location',
        key: 'location',
        icon: <LocationIcon />,
        isSort: true,
      },
      {
        title: 'Company',
        key: 'company',
        icon: <LockBoxIcon />,
        isSort: true,
      },
      {
        title: 'Status',
        key: 'status',
        icon: <CheckboxIcon />,
        isSort: true,
        renderBody: ({ status }) => (
          <Status type={status as 'online' | 'offline'} />
        ),
      },
      {
        title: '',
        key: 'action',
        renderBody: () => (
          <div className="flex gap-2">
            <button>
              <PencilIcon />
            </button>
            <button>
              <BinIcon />
            </button>
          </div>
        ),
      },
    ],
    dataSource: [
      {
        id: '1',
        name: 'John Doe',
        phone: '123-456-7890',
        location: 'New York, NY',
        company: 'ABC Company',
        status: 'online',
      },
      {
        id: '2',
        name: 'John Doe',
        phone: '123-456-7890',
        location: 'New York, NY',
        company: 'ABC Company',
        status: 'offline',
      },
      {
        id: '3',
        name: 'John Doe',
        phone: '123-456-7890',
        location: 'New York, NY',
        company: 'ABC Company',
        status: 'online',
      },
      {
        id: '4',
        name: 'John Doe',
        phone: '123-456-7890',
        location: 'New York, NY',
        company: 'ABC Company',
        status: 'offline',
      },
      {
        id: '5',
        name: 'John Doe',
        phone: '123-456-7890',
        location: 'New York, NY',
        company: 'ABC Company',
        status: 'offline',
      },
    ],
    currentPage: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 100,
  },
};
