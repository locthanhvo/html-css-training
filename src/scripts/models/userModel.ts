import {
  LIMIT_DEFAULT,
  ORDER_DESC,
  PAGE_DEFAULT,
  SNACKBAR_MESSAGE,
  SORT_DEFAULT,
} from '@/constants';
import { HttpsService } from '@/services';
import { User, UserForm, UserQueryParamsType, UserFormat } from '@/types';

/**
 * @class UserModel
 * Manages the user data
 */
export class UserModel {
  private httpsService: HttpsService<UserForm, User, UserQueryParamsType>;
  query: UserQueryParamsType;
  constructor() {
    this.httpsService = new HttpsService<UserForm, User, UserQueryParamsType>(
      'users'
    );
    this.query = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      sortBy: SORT_DEFAULT,
      order: ORDER_DESC,
      firstName: '',
      email: '',
    };
  }

  async getList(query: UserQueryParamsType): Promise<User[]> {
    return (await this.httpsService.get('', query)) as User[];
  }

  async get(id: string): Promise<User> {
    return (await this.httpsService.get(id, {} as UserQueryParamsType)) as User;
  }

  async addUser(data: UserFormat): Promise<User> {
    const user = {
      ...data,
      createdAt: new Date().toISOString(),
      email: data.email.toLowerCase(),
    };

    const [userExist] = await this.getUsersByEmail({
      ...this.query,
      email: user.email,
    });

    if (userExist) throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED);

    return await this.httpsService.post(user);
  }

  async deleteUser(id: string): Promise<void> {
    return await this.httpsService.delete(id);
  }

  async updateUser(id: string, data: UserForm): Promise<User> {
    const [userExist] = await this.getUsersByEmail({
      ...this.query,
      email: data.email,
    });

    if (userExist && userExist.id !== id)
      throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED);

    return await this.httpsService.put(id, data);
  }

  async getUsersByEmail(query: UserQueryParamsType): Promise<User[]> {
    return (await this.httpsService.get('', query)) as User[];
  }
}
