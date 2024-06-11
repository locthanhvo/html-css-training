import { TBrigade } from '@/types';

export const INITIAL_BRIGADE: TBrigade = {
  id: '',
  name: '',
  description: '',
  commissioner: '',
  role: '',
  createdAt: '',
  updatedAt: '',
};

export const BRIGADE_ROLE = [
  {
    value: 'admin',
    name: 'Admin',
  },
  {
    value: 'member',
    name: 'Member',
  },
];
