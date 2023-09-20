import { OPTION_RECORDS } from '../constants';

export const getUserDashBoardTemplate = () => {
  const optionRecords = OPTION_RECORDS.map(
    (item) => `<option value=${item}>${item}</option>`
  );

  return `
    <div class="dashboard-content">
      <h1 class="title-list">Users Dashboard</h1>

      <div class="user-help flex-between">
        <div class="user-search">
          <img
            class="search-icon"
            src="/svgs/search-icon.svg"
            alt="search icon"
          />
          <input class="input-search" type="text" name="search" />
        </div>

        <div class="btn-group">
          <button class="btn btn-primary btn-add">
            Add user
            <img
              class="add-icon"
              src="/svgs/add-icon.svg"
              alt=""
            />
          </button>

          <div class="select-sort">
            <select class="sort-option">
              <option class="select-item" value="">Sort by</option>
              <option class="select-item" value="firstName">Name</option>
              <option class="select-item" value="email">Email</option>
            </select>
          </div>
        </div>
      </div>

      <div class="list-content">
        <h2 class="text-title text-title-list">List Users</h2>
        <table class="table-user"></table>
        <div class="table-empty flex-center">
          <img
          class="empty-icon"
          src="/svgs/empty-icon.svg"
          alt="search icon"
          />
          <div class="description-empty text-field">No Data</div>
        </div>
      </div>

      <div class="pagination">
        <p class="text-item-page">Item per page:</p>
        <select class="number-record">
        ${optionRecords}
        </select>
        <div class="btn-pagination">
          <button class="btn-previous">
            <img src="/svgs/previous-icon.svg" alt="previous icon" />
          </button>
          <button class="btn-next">
            <img src="/svgs/next-icon.svg" alt="next icon" />
          </button>
        </div>
      </div>
    </div>`;
};
