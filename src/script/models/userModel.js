import { HttpsService } from '../services';

/**
 * @class UserModel
 * Manages the user data
 */
export class UserModel {
  constructor() {
    this.httpsService = new HttpsService('users');
  }

  async addUser(data) {
    const user = {
      ...data,
      createdAt: new Date(),
      email: data.email.toLowerCase(),
    };

    return await this.httpsService.post(user);
  }

  async get(id, query) {
    return await this.httpsService.get(id, query);
  }

  async deleteUser(id) {
    return await this.httpsService.delete(id);
  }

  async updateUser(id, data) {
    return await this.httpsService.put(id, data);
  }
}
