import { HEADER_TABLE_LIST } from '../constants';
import { formatDate } from '../utils';

export const getUserListTemplate = (users) => {
  const headerLabels = HEADER_TABLE_LIST.map(
    (item) => `<th class="table-heading">${item}</th>`
  ).join('');

  return `
        <tr class="table-row" id="header-row">
            ${headerLabels}
        </tr>
        ${
          users.length !== 0
            ? users
                .map(
                  (data) => `            
            <tr class="table-row ">
                  <td class="table-cell-username">
                    <h3 class="text-xs">${
                      data.firstName + ' ' + data.lastName
                    }</h3>
                    <p class="text-2xs">${data.email}</p>
                  </td>
                  <td class="table-cell text-cell">${data.phone}</td>
                  <td class="table-cell text-cell">${formatDate(
                    data.createdAt
                  )}</td>
                  <td class="table-cell">
                    <div class="gender-tag ${data.gender}">${data.gender}</div>
                  </td>
                  <td class="table-cell cell-action">
                    <button class="btn-edit" data-id=${data.id}>
                      <img src="/svgs/edit-icon.svg" alt="edit icon" />
                    </button>
                    <button class="btn-delete" data-id=${data.id}>
                      <img
                          src="/svgs/delete-icon.svg"
                          alt="delete icon"
                      />
                    </button>
                  </td>
            </tr>`
                )
                .join('')
            : `            
            <tr class="table-row ">
                <td class="table-cell text-cell">Data empty</td>
            </tr>`
        }`;
};
