import { TUser } from '@/types';

export const formatResponseUser = (user?: TUser[]) => {
  return user?.map((item) => {
    const { id, firstName, lastName, email, phone, status } = item;
    return {
      id,
      userName: firstName && lastName ? `${firstName} ${lastName}` : '',
      firstName,
      status,
      email,
      phone,
    };
  });
};
