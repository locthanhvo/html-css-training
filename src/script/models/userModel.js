import { HttpsService } from '../services';

/**
 * @class UserModel
 * Manages the user data
 */
export class UserModel {
  constructor() {
    this.httpsService = new HttpsService('users');
  }

  addUser(data) {
    const user = {
      ...data,
      createdAt: new Date(),
      email: data.email.toLowerCase(),
    };

    return this.httpsService.post(user);
  }

  get(id, query) {
    return this.httpsService.get(id, query);
  }

  deleteUser(id) {
    return this.httpsService.delete(id);
  }

  updateUser(id, data) {
    return this.httpsService.put(id, data);
  }
}
