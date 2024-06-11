// Utils
import { formatResponseUser } from '@/utils';

// Types
import { TUser } from '@/types';

// Constants
import { STATUS } from '@/constants';

// Mock data for testing
const users: TUser[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    status: STATUS.ACTIVE,
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: '',
    email: 'jane.doe@example.com',
    phone: '098-765-4321',
    status: STATUS.INACTIVE,
  },
  {
    id: '3',
    firstName: '',
    lastName: '',
    email: 'no.name@example.com',
    phone: '111-222-3333',
    status: STATUS.ACTIVE,
  },
];

describe('formatResponseUser', () => {
  it('should format users correctly', () => {
    const formattedUsers = formatResponseUser(users);
    expect(formattedUsers).toEqual([
      {
        id: '1',
        userName: 'John Doe',
        firstName: 'John',
        status: 'Active',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      },
      {
        id: '2',
        userName: '',
        firstName: 'Jane',
        status: 'InActive',
        email: 'jane.doe@example.com',
        phone: '098-765-4321',
      },
      {
        id: '3',
        userName: '',
        firstName: '',
        status: 'Active',
        email: 'no.name@example.com',
        phone: '111-222-3333',
      },
    ]);
  });

  it('should return an empty array when input is undefined', () => {
    const formattedUsers = formatResponseUser(undefined);
    expect(formattedUsers).toEqual(undefined);
  });

  it('should return an empty array when input is an empty array', () => {
    const formattedUsers = formatResponseUser([]);
    expect(formattedUsers).toEqual([]);
  });
});
