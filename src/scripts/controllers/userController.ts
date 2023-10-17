/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param userModel
 * @param userView
 */

import { SNACKBAR_MESSAGE, SnackStatus, ToggleStatus } from '@/constants';
import { handleToggleLoading, showSnackBar } from '@/helpers';
import { UserModel } from '@/models';
import { User, UserForm, UserQueryParamsType, UserFormat } from '@/types';
import { UserView } from '@/views';

export class UserController {
  userModel: UserModel;
  userView: UserView;

  constructor(userModel: UserModel, userView: UserView) {
    this.userModel = userModel;
    this.userView = userView;

    this.init();
  }

  init = async (): Promise<void> => {
    await this.showUserList(this.userView.query);
    this.userView.bindUserListChange(this.showUserList);
    this.userView.bindFormAddUser(this.addUser);
    this.userView.bindDeleteUser(this.deleteUser);
    this.userView.bindUserDetail(this.showUserModal);
    this.userView.updateUser = this.updateUser;
  };

  /**
   * This function has the function of display list users
   * @param query query params
   */
  showUserList = async (query: UserQueryParamsType): Promise<void> => {
    try {
      const data = await this.userModel.getList(query);

      this.userView.renderUserList(data);
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.GET_FAILED, SnackStatus.Error);
    }
  };

  /**
   * This function has the function of adding user
   * @param data data user need add
   */
  addUser = async (data: UserFormat): Promise<void> => {
    await this.userModel.addUser(data);
    await this.showUserList(this.userView.query);
  };

  /**
   * This function has the function of deleting user
   * @param id id user delete
   */
  deleteUser = async (id: string): Promise<void> => {
    handleToggleLoading(ToggleStatus.Open);

    try {
      await this.userModel.deleteUser(id);
      await this.showUserList(this.userView.query);
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_SUCCESS, SnackStatus.Success);
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_FAILED, SnackStatus.Error);
    }

    handleToggleLoading(ToggleStatus.Close);
  };

  /**
   * This function has the function of displaying the detail of user
   * @param id id user detail
   */
  showUserModal = async (id: string): Promise<void> => {
    try {
      const data = await this.userModel.get(id);
      this.userView.renderUserDetail(data);
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.GET_FAILED, SnackStatus.Error);
    }
  };

  /**
   * This function has the function of updating user
   * @param data data user need update
   */
  updateUser = async (data: User): Promise<void> => {
    await this.userModel.updateUser(data.id, data);
    await this.showUserList(this.userView.query);
  };
}
