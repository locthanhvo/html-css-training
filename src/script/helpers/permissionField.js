import { PERMISSION_FIELDS, ACTIONS } from '../constants';

export const permissionFields = (values) => {
  values.permissions = {};

  PERMISSION_FIELDS.forEach((field) => {
    values.permissions[field] = {};

    ACTIONS.forEach((action) => {
      const permissionKey = `${field}${action}`;

      values.permissions[field][action.toLowerCase()] =
        values[permissionKey] === 'on';
      delete values[permissionKey];
    });
  });
};
