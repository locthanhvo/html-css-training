import {
  CONFIRM_MESSAGE,
  DEBOUNCE_DURATION,
  LIMIT_DEFAULT,
  ORDER_DESC,
  PAGE_DEFAULT,
  SORT_DEFAULT,
} from '../constants';
import { createElement, displayModal, querySelector } from '../helpers';
import {
  getConfirmModalTemplate,
  getUserDashBoardTemplate,
  getUserFormTemplate,
} from '../templates';
import { getUserListTemplate } from '../templates/userListTemplate';
import { debounce, getFormValues, permissionFields } from '../utils';
import {
  removeErrorMessage,
  showErrorMessage,
  validateForm,
} from '../validators';

/**
 * @class UserView
 *
 * Manages view data user
 */
export class UserView {
  constructor() {
    this.mainElement = querySelector('.main-content');
    this.users = null;
    this.query = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      sortBy: SORT_DEFAULT,
      order: ORDER_DESC,
    };
    this.init();
  }

  init = async () => {
    this.bindDashboardInit();
  };

  bindDashboardInit() {
    const sectionElement = createElement('section');
    sectionElement.classList.add('dashboard');

    sectionElement.innerHTML = getUserDashBoardTemplate();

    this.mainElement.appendChild(sectionElement);
  }

  bindFormAddUser(handler) {
    const btnElement = querySelector('.btn-add', this.mainElement);

    btnElement.onclick = () => {
      displayModal({ template: getUserFormTemplate() });
      this.handlerFormAddUser(handler);
    };
  }

  handlerFormAddUser(handler) {
    querySelector('.btn-add-user', this.mainElement).addEventListener(
      'click',
      () => {
        this.addUser = handler;
        removeErrorMessage();
      }
    );

    // Event submit form add user
    querySelector('.form-content').addEventListener(
      'submit',
      this.handlerAddUser
    );
  }

  handlerAddUser = async () => {
    const formElement = querySelector('.form-content');
    const formValues = getFormValues(formElement);

    permissionFields(formValues);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showErrorMessage(errorMessage, formElement);
    } else {
      const modalElement = querySelector('.modal', this.mainElement);
      const btnSubmit = querySelector('.btn-add-user', formElement);

      // Set atribute disabled for add button add
      btnSubmit.setAttribute('disabled', '');
      await this.addUser(formValues);
      formElement.reset();
      modalElement.remove();
    }
  };

  renderUserList(data) {
    const tableElement = querySelector('.table-user');
    const nextBtn = querySelector('.btn-next', this.mainElement);
    const previousBtn = querySelector('.btn-previous', this.mainElement);
    const userListTemplate = getUserListTemplate(data);
    const queryLimit = this.query.limit;

    if (data.length < queryLimit) {
      this.disablePaginationBtn(nextBtn);
    } else {
      this.enablePaginationBtn(nextBtn);
    }

    if (this.query.page === 1) {
      this.disablePaginationBtn(previousBtn);
    }

    tableElement.innerHTML = userListTemplate;
    this.users = data;
  }

  async bindSearchInput(handler) {
    const searchInput = querySelector('.input-search', this.mainElement);

    const debounceSearch = debounce(async (e) => {
      this.query.firstName = e.target.value;
      await handler(this.query);
    }, DEBOUNCE_DURATION);

    searchInput.addEventListener('input', debounceSearch);
  }

  async bindSortSelect(handler) {
    const sortSelect = querySelector('.sort-option', this.mainElement);

    sortSelect.addEventListener('change', async (e) => {
      this.query.sortBy = e.target.value;
      this.query.order = ORDER_DESC;
      await handler(this.query);
    });
  }

  async bindLimitSelect(handler) {
    const limitSelect = querySelector('.number-record', this.mainElement);

    limitSelect.addEventListener('change', async (e) => {
      this.query.limit = parseInt(e.target.value);
      await handler(this.query);
    });
  }

  async bindNextButton(handler) {
    const nextBtn = querySelector('.btn-next', this.mainElement);
    const previousBtn = querySelector('.btn-previous', this.mainElement);

    nextBtn.addEventListener('click', async (e) => {
      const itemCurrentPage = this.users.length;
      const queryLimit = this.query.limit;

      if (itemCurrentPage === queryLimit) {
        this.query.page = this.query.page + 1;
        await handler(this.query);
        this.enablePaginationBtn(previousBtn);
      }

      const itemLastPage = this.users.length;

      if (itemLastPage < queryLimit) {
        this.disablePaginationBtn(nextBtn);
        e.preventDefault();
      }
    });
  }

  async bindPreviousButton(handler) {
    const previousBtn = querySelector('.btn-previous', this.mainElement);
    const nextBtn = querySelector('.btn-next', this.mainElement);

    previousBtn.addEventListener('click', async (e) => {
      if (this.query.page > 1) {
        this.enablePaginationBtn(nextBtn);

        this.query.page = this.query.page - 1;
        await handler(this.query);
      }

      if (this.query.page === 1) {
        this.disablePaginationBtn(previousBtn);
        e.preventDefault();
      }
    });
  }

  disablePaginationBtn(button) {
    button.classList.add('btn-disable');
    button.classList.remove('btn-enable');
  }

  enablePaginationBtn(button) {
    button.classList.remove('btn-disable');
    button.classList.add('btn-enable');
  }

  bindUserListChange(handler) {
    this.bindSearchInput(handler);
    this.bindSortSelect(handler);
    this.bindLimitSelect(handler);
    this.bindNextButton(handler);
    this.bindPreviousButton(handler);
  }

  handlerDeleteUser(handler) {
    const tableElement = querySelector('.table-user');

    tableElement.addEventListener('click', async (e) => {
      const target = e.target;
      const btnDelete = target.closest('.btn-delete');

      if (btnDelete) {
        const userId = btnDelete.dataset.id;

        displayModal({
          template: getConfirmModalTemplate(CONFIRM_MESSAGE.confirmRemove),
          handler: () => handler(userId),
        });
      }
    });
  }

  bindDeleteUser(handler) {
    this.handlerDeleteUser(handler);
  }

  handlerUserDetail(handler) {
    const tableElement = querySelector('.table-user');

    tableElement.addEventListener('click', async (e) => {
      const target = e.target;
      const btnEdit = target.closest('.btn-edit');

      if (btnEdit) {
        const userId = btnEdit.dataset.id;

        await handler(userId);
      }
    });
  }

  bindUserDetail(data) {
    this.handlerUserDetail(data);
  }

  renderUserDetail(data) {
    displayModal({ template: getUserFormTemplate(data) });

    querySelector('.btn-update-user').addEventListener('click', () => {
      removeErrorMessage();
      this.handlerSubmitUpdateUser(data.id);
    });
  }

  async handlerUpdateUser(id) {
    const formElement = querySelector('.form-content');
    const formValues = getFormValues(formElement);

    permissionFields(formValues);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showErrorMessage(errorMessage, formElement);
    } else {
      const modalElement = querySelector('.modal', this.mainElement);
      const btnSubmit = querySelector('.btn-update-user', formElement);

      // Set atribute disabled for add button add
      btnSubmit.setAttribute('disabled', '');
      await this.updateUserHandler({ ...formValues, id });
      modalElement.remove();
    }
  }

  handlerSubmitUpdateUser(id) {
    querySelector('.form-content').addEventListener(
      'submit',
      this.handlerUpdateUser(id)
    );
  }
}
