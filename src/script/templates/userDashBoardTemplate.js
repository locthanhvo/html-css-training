import { OPTION_RECORDS } from '../constants';

export const getUserDashBoardTemplate = () => {
  const optionRecords = OPTION_RECORDS.map(
    (item) => `<option value=${item}>${item}</option>`
  );

  return `
    <div class="nav-drawer">
      <h1 class="text-logo">YOURLOGO</h1>

      <div class="nav-item">
        <div>
          <img
            src="/svgs/dashboard-icon.svg"
            alt="dashboard icon"
          />
        </div>
        <h2 class="text-nav">Dashboard</h2>
        <div class="line-nav-drawer"></div>
      </div>
    </div>

    <div class="dashboard-content">
      <h2 class="title-list">Users Dashboard</h2>

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
        <table class="table-user">
            
        </table>
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
