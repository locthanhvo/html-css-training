import {
  CONFIRM_MESSAGE,
  DEBOUNCE_DURATION,
  LIMIT_DEFAULT,
  ORDER_DESC,
  PAGE_DEFAULT,
  SNACKBAR_MESSAGE,
  SORT_DEFAULT,
  SnackStatus,
  ToggleStatus,
} from '@/constants';
import {
  displayModal,
  handleToggleLoading,
  querySelector,
  showSnackBar,
} from '@/helpers';
import {
  getConfirmModalTemplate,
  getUserDashBoardTemplate,
  getUserFormTemplate,
  getUserListTemplate,
} from '@/templates';
import {
  User,
  QueryExecutor,
  UserForm,
  AddUser,
  UpdateUser,
  UserQueryParamsType,
  UserFormat,
} from '@/types';
import { debounce, getFormValues, formatFormValues } from '@/utils';
import {
  removeErrorMessage,
  validateUserForm,
  validateForm,
} from '@/validators';

/**
 * @class UserView
 *
 * Manages view data user
 */
export class UserView {
  private mainElement: HTMLDivElement;
  query: UserQueryParamsType;
  private recordPerPage: number | null;
  private addUser: AddUser;
  updateUser: UpdateUser;

  constructor() {
    this.mainElement = querySelector('.main-content');
    this.recordPerPage = null;
    this.addUser = null;
    this.updateUser = null;
    this.query = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      sortBy: SORT_DEFAULT,
      order: ORDER_DESC,
      firstName: '',
      email: '',
    };
    this.init();
  }

  init = async (): Promise<void> => {
    this.bindDashboardInit();
  };

  /**
   * @description This function has the function of init UI dashboard
   */
  bindDashboardInit = (): void => {
    const sectionElement = document.createElement('section');
    sectionElement.classList.add('dashboard');

    sectionElement.innerHTML = getUserDashBoardTemplate();

    this.mainElement.appendChild(sectionElement);
  };

  /**
   * This function has the function of render UI list users
   * @param data list data user need render
   */
  renderUserList = (data: User[]): void => {
    const tableElement = querySelector<HTMLDivElement>('.table-user');
    const nextBtn = querySelector<HTMLButtonElement>(
      '.btn-next',
      this.mainElement
    );
    const previousBtn = querySelector<HTMLButtonElement>(
      '.btn-previous',
      this.mainElement
    );
    const userListTemplate = getUserListTemplate(data);
    const queryLimit = this.query.limit;
    const queryPage = this.query.page;

    this.handleEmptyDataDisplay(data);
    data.length < queryLimit
      ? this.disablePaginationBtn(nextBtn)
      : this.enablePaginationBtn(nextBtn);

    queryPage === 1 && this.disablePaginationBtn(previousBtn);
    !data.length && queryPage === 1
      ? this.disablePagination()
      : this.enablePagination();

    tableElement.innerHTML = userListTemplate;
    this.recordPerPage = data?.length;
  };

  /**
   * @description This function has the function of disable pagination
   */
  disablePagination(): void {
    const pagination: HTMLDivElement = querySelector(
      '.pagination',
      this.mainElement
    );

    pagination.classList.add('close-pagination');
  }

  /**
   * @description This function has the function of enable pagination
   */
  enablePagination(): void {
    const pagination: HTMLDivElement = querySelector(
      '.pagination',
      this.mainElement
    );

    pagination.classList.remove('close-pagination');
  }

  /**
   * This function has the function of disable pagination button
   * @param button button need disable
   */
  disablePaginationBtn(button: HTMLButtonElement): void {
    button.classList.add('btn-disable');
    button.classList.remove('btn-enable');
  }

  /**
   *  This function has the function of enable pagination button
   * @param button button need enable
   */
  enablePaginationBtn(button: HTMLButtonElement): void {
    button.classList.remove('btn-disable');
    button.classList.add('btn-enable');
  }

  /**
   * This function has the function of display UI empty data
   * @param data data need check empty
   */
  handleEmptyDataDisplay(data: User[]): void {
    const emptyTable = querySelector<HTMLDivElement>(
      '.table-empty',
      this.mainElement
    );

    !data.length
      ? emptyTable.classList.add('open-empty')
      : emptyTable.classList.remove('open-empty');
  }

  /**
   * This function has the function of handle the next page function
   * @param handler function used to query pagination
   */
  async bindNextButton(
    handler: QueryExecutor<UserQueryParamsType>
  ): Promise<void> {
    const nextBtn = querySelector<HTMLButtonElement>(
      '.btn-next',
      this.mainElement
    );
    const previousBtn = querySelector<HTMLButtonElement>(
      '.btn-previous',
      this.mainElement
    );

    nextBtn.addEventListener('click', async (e: MouseEvent) => {
      const itemCurrentPage = this.recordPerPage;
      const queryLimit = this.query.limit;

      if (itemCurrentPage === queryLimit) {
        this.query.page = this.query.page + 1;
        await handler(this.query);
        this.enablePaginationBtn(previousBtn);
      }

      const itemLastPage = this.recordPerPage;

      if (itemLastPage && itemLastPage < queryLimit) {
        this.disablePaginationBtn(nextBtn);
        this.enablePagination();
        e.preventDefault();
      }
    });
  }

  /**
   * This function has the function of handle the previous page function
   * @param handler function used to query pagination
   */
  async bindPreviousButton(
    handler: QueryExecutor<UserQueryParamsType>
  ): Promise<void> {
    const previousBtn = querySelector<HTMLButtonElement>(
      '.btn-previous',
      this.mainElement
    );
    const nextBtn = querySelector<HTMLButtonElement>(
      '.btn-next',
      this.mainElement
    );

    previousBtn.addEventListener('click', async (e: MouseEvent) => {
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

  /**
   * This function has the function of handle the search function
   * @param handler function used to query search
   */
  async bindSearchInput(
    handler: QueryExecutor<UserQueryParamsType>
  ): Promise<void> {
    const searchInput = querySelector<HTMLInputElement>(
      '.input-search',
      this.mainElement
    );

    const debounceSearchHandler = async (event: InputEvent) => {
      this.query.firstName = (event.target as HTMLInputElement).value;
      this.query.page = PAGE_DEFAULT;
      await handler(this.query);
    };

    const debounceSearch = debounce(debounceSearchHandler, DEBOUNCE_DURATION);

    searchInput.addEventListener('input', debounceSearch as EventListener);
  }

  /**
   * This function has the function of handle the sort function
   * @param handler function used to query sort
   */
  async bindSortSelect(
    handler: QueryExecutor<UserQueryParamsType>
  ): Promise<void> {
    const sortSelect = querySelector('.sort-option', this.mainElement);

    sortSelect.addEventListener('change', async (e: Event) => {
      this.query.sortBy = (e.target as HTMLSelectElement).value;
      this.query.order = ORDER_DESC;
      await handler(this.query);
    });
  }

  /**
   * This function has the function of handle the limit record function
   * @param handler function used to query limit record
   */
  async bindLimitSelect(
    handler: QueryExecutor<UserQueryParamsType>
  ): Promise<void> {
    const limitSelect = querySelector('.number-record', this.mainElement);

    limitSelect.addEventListener('change', async (e: Event) => {
      this.query.limit = parseInt((e.target as HTMLSelectElement).value);
      this.query.page = PAGE_DEFAULT;
      await handler(this.query);
    });
  }

  bindUserListChange(handler: QueryExecutor<UserQueryParamsType>): void {
    this.bindNextButton(handler);
    this.bindPreviousButton(handler);
    this.bindSearchInput(handler);
    this.bindSortSelect(handler);
    this.bindLimitSelect(handler);
  }

  /**
   *  This function has the function of display UI user form and handler add user
   * @param handler function handle data user add
   */
  bindFormAddUser(handler: (user: UserFormat) => Promise<void>): void {
    const btnElement = querySelector<HTMLButtonElement>(
      '.btn-add',
      this.mainElement
    );

    btnElement.onclick = () => {
      displayModal({ template: getUserFormTemplate() });
      this.handleFormAddUser(handler);
    };
  }

  /**
   * @description This function has the function of handler add user
   */
  handleAddUser = async (): Promise<void> => {
    try {
      const formElement = querySelector<HTMLFormElement>('.form-content');
      const formValues = getFormValues<UserForm>(formElement);

      const values = formatFormValues(formValues);

      const isInvalidForm = validateForm(
        values,
        validateUserForm(),
        formElement
      );

      if (isInvalidForm) {
        handleToggleLoading(ToggleStatus.Open);

        const modalElement = querySelector('.modal', this.mainElement);
        const btnSubmit = querySelector('.btn-add-user', formElement);

        this.addUser && (await this.addUser(values));

        btnSubmit.setAttribute('disabled', '');
        formElement.reset();
        modalElement.remove();
        showSnackBar(SNACKBAR_MESSAGE.ADD_SUCCESS, SnackStatus.Success);
      }
    } catch (error) {
      showSnackBar(error as string, SnackStatus.Error);
    }
    handleToggleLoading(ToggleStatus.Close);
  };

  /**
   * This function has the function of handler event add user
   * @param handler function handler event add user
   */
  handleFormAddUser(handler: AddUser): void {
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
      this.handleAddUser
    );
  }

  /**
   * This function has the function of handler delete user
   * @param handler function receives user Id
   */
  handleDeleteUser(handler: (id: string) => void): void {
    const tableElement = querySelector<HTMLTableElement>('.table-user');

    tableElement.addEventListener('click', async (e: MouseEvent) => {
      const target = e.target as Element;
      const btnDelete = target.closest<HTMLButtonElement>('.btn-delete');

      if (btnDelete) {
        const userId = btnDelete.dataset.id;
        userId &&
          displayModal({
            template: getConfirmModalTemplate(CONFIRM_MESSAGE.CONFIRM_REMOVE),
            handler: () => handler(userId),
          });
      }
    });
  }

  bindDeleteUser(handler: (id: string) => void): void {
    this.handleDeleteUser(handler);
  }

  /**
   * This function has the function of handler event user detail
   * @param handler function receives user Id
   */
  handleUserDetail(handler: (id: string) => void): void {
    const tableElement = querySelector<HTMLTableElement>('.table-user');

    tableElement.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as Element;
      const btnEdit = target.closest<HTMLButtonElement>('.btn-edit');

      if (btnEdit) {
        const userId = btnEdit.dataset.id;
        userId && handler(userId);
      }
    });
  }

  bindUserDetail(handler: (id: string) => void): void {
    this.handleUserDetail(handler);
  }

  /**
   * This function has the function of display UI user detail
   * @param data data user detail
   */
  renderUserDetail(data: User): void {
    displayModal({ template: getUserFormTemplate(data) });

    querySelector('.btn-update-user').addEventListener('click', () => {
      removeErrorMessage();
      this.handleSubmitUpdateUser(data.id);
    });
  }

  /**
   * This function has the function of handler update user
   * @param id id user update
   */
  handleUpdateUser = async (id: string): Promise<void> => {
    try {
      const formElement = querySelector<HTMLFormElement>('.form-content');
      const formValues = getFormValues<UserForm>(formElement);

      const values = formatFormValues(formValues);

      const isInvalidForm = validateForm(
        values,
        validateUserForm(),
        formElement
      );

      if (isInvalidForm) {
        handleToggleLoading(ToggleStatus.Open);

        const modalElement = querySelector('.modal', this.mainElement);
        const btnSubmit = querySelector('.btn-update-user', formElement);

        // Set atribute disabled for add button update
        this.updateUser && (await this.updateUser({ ...values, id }));
        btnSubmit.setAttribute('disabled', '');
        modalElement.remove();
        showSnackBar(SNACKBAR_MESSAGE.UPDATE_SUCCESS, SnackStatus.Success);
      }
    } catch (error) {
      showSnackBar(error as string, SnackStatus.Error);
    }

    handleToggleLoading(ToggleStatus.Close);
  };

  /**
   * This function has the function of handler event submit form up
   * @param id id user update
   */
  handleSubmitUpdateUser = async (id: string): Promise<void> => {
    querySelector('.form-content').addEventListener('submit', () =>
      this.handleUpdateUser(id)
    );
  };
}
