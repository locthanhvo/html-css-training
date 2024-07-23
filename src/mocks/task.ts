import AvatarUser from '@/assets/images/avatar-small-1.png';
import AvatarUser2 from '@/assets/images/avatar-small-2.png';
import AvatarUser3 from '@/assets/images/avatar-small-3.png';

export const TASK_DETAIL = {
  id: '1',
  title: 'Global Resorts Network',
  label: [
    {
      name: 'Space Tasks 1',
      value: 'space-tasks-1',
    },
  ],
  members: [
    { value: '1', name: 'Member 1', image: AvatarUser },
    { value: '2', name: 'Member 2', image: AvatarUser2 },
    { value: '3', name: 'Member 3', image: AvatarUser3 },
  ],
  created_at: '2022-01-01',
  updated_at: '2022-01-01',
  startDate: '2024-07-01T00:00:00.000Z',
  endDate: '2024-07-03T00:00:00.000Z',
  boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
};

export const TASK_DETAIL_2 = {
  id: '2',
  title: 'Global Suns Network',
  label: [
    {
      name: 'Space Tasks 1',
      value: 'space-tasks-1',
    },
    {
      name: 'Space Tasks 2',
      value: 'space-tasks-2',
    },
  ],
  members: [
    { value: '1', name: 'Member 1', image: AvatarUser },
    { value: '2', name: 'Member 2', image: AvatarUser2 },
    { value: '3', name: 'Member 3', image: AvatarUser3 },
  ],
  images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
  description: '<p>hello</p><p>hi</p>',
  startDate: '2024-07-01T00:00:00.000Z',
  endDate: '2024-07-02T00:00:00.000Z',
  created_at: '2022-01-01',
  updated_at: '2022-01-01',
  boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
};

export const LIST_TASK = {
  id: '1',
  title: 'to do',
  total: 2,
  color: 'electricPurple',
  tasks: [TASK_DETAIL, TASK_DETAIL_2],
};

export const MOCK_TASKS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    label: [
      {
        name: 'Space Tasks 1',
        value: 'space-tasks-1',
      },
    ],
    title: 'Global Suns Network',
    description: 'description 2 \n description 3',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
    startDate: '2024-07-01T00:00:00.000Z',
    endDate: '2024-07-10T00:00:00.000Z',
    boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    label: [
      {
        name: 'Space Tasks 1',
        value: 'space-tasks-1',
      },
    ],
    title: 'Make Money Online Though',
    boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    label: [
      {
        name: 'Space Tasks 1',
        value: 'space-tasks-1',
      },
    ],
    title: 'Characteristics Of A Successful',
    description: 'Task 3 description',
    boardId: '93d1f6a8-c312-436a-886f-a646bf424209',
  },
];

export const MOCK_BOARDS = [
  {
    id: '93d1f6a8-c312-436a-886f-a646bf424209',
    title: 'Todo',
    color: 'electricPurple',
  },
  {
    id: '93d1f6a8-c312-436a-886f-a646bf424208',
    title: 'In Work',
    color: 'skyBlue',
  },
  {
    id: '93d1f6a8-c312-436a-886f-a646bf424207',
    title: 'Review',
    color: 'yellow',
  },
  {
    id: '9b1a1aa0-afc0-4bdb-90f7-7d8330ec254b',
    title: 'Done',
    color: 'green',
  },
];
