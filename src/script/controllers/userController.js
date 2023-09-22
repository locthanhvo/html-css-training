/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param userModel
 * @param userView
 */

import { SNACKBAR_MESSAGE, TOGGLE_STATUS } from '../constants';
import { SnackBar, handleToggleLoading } from '../helpers';
import { buildQueryString } from '../utils';

export class UserController {
  snackBar = new SnackBar();

  constructor(userModel, userView) {
    this.userModel = userModel;
    this.userView = userView;

    this.init();
  }

  init = async () => {
    await this.showUserList(this.userView.query);
    this.userView.bindFormAddUser(this.addUser);
    this.userView.bindDeleteUser(this.deleteUser.bind(this));
    this.userView.bindUserListChange(this.showUserList.bind(this));
    this.userView.bindUserDetail(this.showUserModal.bind(this));
    this.userView.updateUserHandler = this.updateUser;
  };

  addUser = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN);
    try {
      const queryString = buildQueryString({ email: data.email });
      const [email] = await this.userModel.get('', queryString);

      if (email) {
        this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.EMAIL_FAILED);
      } else {
        await this.userModel.addUser(data);
        this.snackBar.handleSnackBarSuccess(SNACKBAR_MESSAGE.ADD_SUCCESS);
        await this.showUserList(this.userView.query);
      }
    } catch (error) {
      this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.ADD_FAILED);
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE);
  };

  deleteUser = async (id) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN);
    try {
      await this.userModel.deleteUser(id);
      await this.showUserList(this.userView.query);
      this.snackBar.handleSnackBarSuccess(SNACKBAR_MESSAGE.REMOVE_SUCCESS);
    } catch (error) {
      this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.REMOVE_FAILED);
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE);
  };

  showUserList = async (query) => {
    try {
      const queryString = buildQueryString(query);
      const data = await this.userModel.get('', queryString);

      this.userView.renderUserList(data);
    } catch (error) {
      console.log(error);
      this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.GET_FAILED);
    }
  };

  showUserModal = async (id) => {
    try {
      const data = await this.userModel.get(id);
      await this.userView.renderUserDetail(data);
    } catch (error) {
      this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.GET_FAILED);
    }
  };

  updateUser = async (data) => {
    handleToggleLoading(TOGGLE_STATUS.OPEN);
    try {
      await this.userModel.updateUser(data.id, data);
      await this.showUserList(this.userView.query);
      this.snackBar.handleSnackBarSuccess(SNACKBAR_MESSAGE.UPDATE_SUCCESS);
    } catch (error) {
      this.snackBar.handleSnackBarError(SNACKBAR_MESSAGE.UPDATE_FAILED);
    }
    handleToggleLoading(TOGGLE_STATUS.CLOSE);
  };
}
