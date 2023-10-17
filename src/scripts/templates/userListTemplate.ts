import { HEADER_TABLE_LIST } from '@/constants';
import { User } from '@/types';
import { formatDate, formatPhoneNumber } from '@/utils';

export const getUserListTemplate = (users: User[]) => {
  const headerLabels = HEADER_TABLE_LIST.map(
    (item) => `<th class="table-heading">${item}</th>`
  ).join('');

  return `
        <tr class="table-row" id="header-row">
            ${headerLabels}
        </tr>
        ${users
          .map((data) => {
            const { firstName, lastName, phone, createdAt, gender, id, email } =
              data;
            return `            
              <tr class="table-row ">
                    <td class="table-cell-username">
                      <h3 class="text-xs">${firstName + ' ' + lastName}</h3>
                      <p class="text-2xs">${email}</p>
                    </td>
                    <td class="table-cell text-cell">${formatPhoneNumber(
                      phone
                    )}</td>
                    <td class="table-cell text-cell">${formatDate(
                      createdAt
                    )}</td>
                    <td class="table-cell">
                      <div class="gender-tag ${gender}">${gender}</div>
                    </td>
                    <td class="table-cell cell-action">
                      <button class="btn-edit" data-id=${id}>
                        <img src="/svgs/edit-icon.svg" alt="edit icon" />
                      </button>
                      <button class="btn-delete" data-id=${id}>
                        <img
                            src="/svgs/delete-icon.svg"
                            alt="delete icon"
                        />
                      </button>
                    </td>
              </tr>`;
          })
          .join('')}`;
};
