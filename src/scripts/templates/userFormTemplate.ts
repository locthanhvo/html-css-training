import { ACTIONS, PERMISSION_FIELDS } from '@/constants';
import { User } from '@/types';

export const getUserFormTemplate = (user?: User) => {
  const {
    id,
    firstName = '',
    lastName = '',
    username = '',
    email = '',
    phone = '',
    gender = '',
    password = '',
    confirmPassword = '',
    permissions,
  } = user || {};

  const rows = PERMISSION_FIELDS.map(
    (item) =>
      `<tr class="table-row">
        <td class="table-cell cell-name">${item}</td>
        <td class="table-cell">
          <div class="checkbox">
            <input name="${
              item + 'Read'
            }" type="checkbox" class="checkbox-item" ${
        permissions?.[item]?.read ? 'checked' : ''
      }/>
          </div>
        </td>
        <td class="table-cell">
          <div class="checkbox">
            <input name="${
              item + 'Write'
            }" type="checkbox" class="checkbox-item" ${
        permissions?.[item]?.write ? 'checked' : ''
      }/>
          </div>
        </td>
        <td class="table-cell">
          <div class="checkbox">
            <input name="${
              item + 'Delete'
            }" type="checkbox" class="checkbox-item"
            ${permissions?.[item]?.delete ? 'checked' : ''}/>
          </div>
        </td>
      </tr>`
  ).join('');

  const headerLabels = ['Permission', ...ACTIONS]
    .map((item) => `<th class="table-heading">${item}</th>`)
    .join('');

  return `
  <div class="form-modal">
    <div class="flex-between modal-header">
      <h2 class="text-title">${!id ? 'Add User' : 'Update User'}</h2>
      <div class="icon-close">
        <img src="/svgs/close-icon.svg" alt="close icon" />
      </div>
    </div>

    <hr class="modal-line" />

    <form class="form-content" method="post" action="javascript:void(0)">
      <div class="form-input">
        <div class="form-gap">

            <div class="form-group">
              <input
                type="text"
                name="firstName"
                class="form-item item-validate"
                id="firstName"
                placeholder="First Name *"
                value='${firstName}'
              />
              <span class="firstName-error error-message"></span>
            </div>

            <div class="form-group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                class="form-item item-validate"
                placeholder="Last Name *"
                value='${lastName}'
              />
              <span class="lastName-error error-message"></span>
            </div>
        </div>

        <div class="form-gap">
            <div class="form-group">
              <input
                type="text"
                name="email"
                id="email"
                class="form-item item-validate"
                placeholder="Email *"
                value='${email}'
              />
              <span class="email-error error-message"></span>
            </div>

            <div class="form-group">
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-item item-validate"
                placeholder="Phone *"
                value='${phone}'
              />
              <span class="phone-error error-message"></span>
            </div>

            <div class="form-group">
              <select
                name="gender"
                class="select-option item-validate"
                id="gender"
              >
                <option class="select-item" value="">Select Gender</option>
                <option class="select-item" value="male" ${
                  gender === 'male' ? 'selected' : ''
                }>Male</option>
                <option class="select-item" value="female" ${
                  gender === 'female' ? 'selected' : ''
                }>Female</option>
              </select>
              <span class="gender-error error-message"></span>
            </div>
        </div>

        <div class="form-gap">
            <div class="form-group">
              <input
                class="form-item item-validate"
                name="username"
                id="username"
                type="text"
                placeholder="Username *"
                value='${username}'
              />
              <span class="username-error error-message"></span>
            </div>
            <div class="form-group">
              <input
                class="form-item item-validate"
                name="password"
                id="password"
                type="password"
                placeholder="Password *"
                value='${password}'
              />
              <span class="password-error error-message"></span>
            </div>
            <div class="form-group">
              <input
                class="form-item item-validate"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password *"
                value='${confirmPassword}'
              />
              <span class="confirmPassword-error error-message"></span>
            </div>
        </div>
      </div>

      <table class="table-permission">
        <tr class="table-row" id="header-row">
          ${headerLabels}
        </tr>
        ${rows}
      </table>

      <div class="modal-footer">
        <button type="submit" class="btn btn-primary ${
          !id ? 'btn-add-user' : 'btn-update-user'
        } ">
        ${!id ? 'Add User' : 'Update User'}
        </button>
        <button type="button" class="btn btn-secondary btn-close">Cancel</button>
      </div>
    </form>
  </div>`;
};
