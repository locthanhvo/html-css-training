import {
  COLOR_NEXT_PAGE,
  COLOR_PREVIOUS_PAGE,
  CONFIRM_MESSAGE,
  DEBOUNCE_DURATION,
  LIMIT_DEFAULT,
  ORDER_DESC,
  PAGE_DEFAULT,
  SORT_DEFAULT,
} from '../constants';
import { displayModal } from '../helpers';
import {
  getConfirmModalTemplate,
  getUserDashBoardTemplate,
  getUserFormTemplate,
} from '../templates';
import { getUserListTemplate } from '../templates/userListTemplate';
import { debounce, getFormValues, permissionFields } from '../utils';
import { removeErrorMessage, showErrorMessage } from '../validators/form-error';
import { validateForm } from '../validators/validate-form';

/**
 * @class UserView
 *
 * Manages view data user
 */
export class UserView {
  constructor() {
    this.mainElement = document.querySelector('.main-content');
    this.sectionElement = null;
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
    this.sectionElement = document.createElement('section');
    this.sectionElement.classList.add('dashboard');

    this.sectionElement.innerHTML = getUserDashBoardTemplate();

    this.mainElement.appendChild(this.sectionElement);
  }

  bindFormAddUser(handler) {
    const btnElement = this.mainElement.querySelector('.btn-add');

    btnElement.onclick = () => {
      displayModal({ template: getUserFormTemplate() });

      this.handlerFormAddUser(handler);
    };
  }

  handlerFormAddUser(handler) {
    document.querySelector('.btn-add-user').addEventListener('click', () => {
      this.addUser = handler;
      removeErrorMessage();
      this.handlerSubmitUser();
    });
  }

  handlerAddUser = async () => {
    const formElement = document.querySelector('.form-content');
    const formValues = getFormValues(formElement);

    permissionFields(formValues);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showErrorMessage(errorMessage, formElement);
    } else {
      const modalElement = this.mainElement.querySelector('.modal');

      await this.addUser(formValues);
      formElement.reset();
      modalElement.remove();
    }
  };

  handlerSubmitUser() {
    document
      .querySelector('.form-content')
      .addEventListener('submit', this.handlerAddUser);
  }

  renderUserList(data) {
    const tableElement = document.querySelector('.table-user');

    if (data.length === 0) {
      tableElement.innerHTML = '';
    }

    const userListTemplate = getUserListTemplate(data);
    tableElement.innerHTML = userListTemplate;
  }

  async bindSearchInput(handler) {
    const searchInput = this.mainElement.querySelector('.input-search');

    const debounceSearch = debounce(async (e) => {
      this.query.firstName = e.target.value;
      await handler(this.query);
    }, DEBOUNCE_DURATION);

    searchInput.addEventListener('input', debounceSearch);
  }

  async bindSortSelect(handler) {
    const sortSelect = this.mainElement.querySelector('.sort-option');

    sortSelect.addEventListener('change', async (e) => {
      this.query.sortBy = e.target.value;
      this.query.order = ORDER_DESC;
      await handler(this.query);
    });
  }

  async bindLimitSelect(handler) {
    const limitSelect = this.mainElement.querySelector('.number-record');

    limitSelect.addEventListener('change', async (e) => {
      this.query.limit = e.target.value;
      await handler(this.query);
    });
  }

  async getNextPageRowCount() {
    const nextPageTableRows = document.querySelectorAll(
      '.table-user .table-row'
    );

    const rowCount = nextPageTableRows.length - 1;

    return rowCount;
  }

  async bindNextButton(handler) {
    const nextBtn = this.mainElement.querySelector('.btn-next');
    const previousBtn = this.mainElement.querySelector('.btn-previous');

    nextBtn.addEventListener('click', async (e) => {
      let itemPerPage = await this.getNextPageRowCount();

      if (itemPerPage === parseInt(this.query.limit)) {
        this.query.page = (parseInt(this.query.page) + 1).toString();

        await handler(this.query);

        itemPerPage = await this.getNextPageRowCount();
        if (itemPerPage < parseInt(this.query.limit)) {
          nextBtn.style.filter = COLOR_NEXT_PAGE;
        }

        previousBtn.style.filter = COLOR_PREVIOUS_PAGE;
      } else {
        e.preventDefault();
      }
    });
  }

  async bindPreviousButton(handler) {
    const previousBtn = this.mainElement.querySelector('.btn-previous');
    const nextBtn = this.mainElement.querySelector('.btn-next');

    previousBtn.addEventListener('click', async (e) => {
      if (parseInt(this.query.page) > 1) {
        nextBtn.style.filter = '';
        this.query.page = (parseInt(this.query.page) - 1).toString();
        await handler(this.query);

        if (parseInt(this.query.page) === 1) {
          previousBtn.style.filter = '';
        }
      } else {
        e.preventDefault();
      }
    });
  }

  bindUserListChange(handler) {
    this.bindSearchInput(handler);
    this.bindSortSelect(handler);
    this.bindLimitSelect(handler);
    this.bindNextButton(handler);
    this.bindPreviousButton(handler);
  }

  handlerDeleteUser(handler) {
    const tableElement = document.querySelector('.table-user');

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
    const tableElement = document.querySelector('.table-user');

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

    document.querySelector('.btn-update-user').addEventListener('click', () => {
      removeErrorMessage();
      displayModal({
        template: getConfirmModalTemplate(CONFIRM_MESSAGE.confirmUpdate),
        handler: () => this.handlerSubmitUpdateUser(data.id),
      });
    });
  }

  async handlerUpdateUser(id) {
    const formElement = document.querySelector('.form-content');
    const formValues = getFormValues(formElement);

    permissionFields(formValues);

    const errorMessage = validateForm(formValues);

    if (Object.keys(errorMessage).length !== 0) {
      showErrorMessage(errorMessage, formElement);
    } else {
      const modalElement = this.mainElement.querySelector('.modal');

      await this.updateUserHandler({ ...formValues, id });
      modalElement.remove();
    }
  }

  handlerSubmitUpdateUser(id) {
    document
      .querySelector('.form-content')
      .addEventListener('submit', this.handlerUpdateUser(id));
  }
}
