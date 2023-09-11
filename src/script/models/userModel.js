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
    const user = { ...data, createdAt: new Date() };

    return this.httpsService.post(user);
  }

  getList(query) {
    return this.httpsService.getList(query);
  }

  deleteUser(id) {
    return this.httpsService.delete(id);
  }

  getUserDetail(id) {
    return this.httpsService.get(id);
  }

  updateUser(id, data) {
    return this.httpsService.put(id, data);
  }
}
