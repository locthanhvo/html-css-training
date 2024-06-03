export type TUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TAuthForm = Omit<TUser, 'id' | 'createdAt'> & {
  confirmPassword: string;
  isAcceptPrivacyPolicy: boolean;
};
