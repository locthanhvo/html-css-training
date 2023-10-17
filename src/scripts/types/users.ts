import { ActionFields, Permission, PermissionForm } from '@/constants';

export type PermissionActions = Record<Lowercase<ActionFields>, boolean>;

export type GeneralPermission = {
  [field in Permission]: PermissionActions;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  phone: string;
  confirmPassword: string;
  permissions: GeneralPermission;
  createdAt: string; // created format type ISOString
}

export type UserForm = Omit<User, 'id' | 'permissions'> & {
  [key in PermissionForm]?: string;
};

export type UserFormat = Omit<User, 'id'>;

export type AddUser = ((user: UserFormat) => Promise<void>) | null;
export type UpdateUser = ((user: User) => Promise<void>) | null;
