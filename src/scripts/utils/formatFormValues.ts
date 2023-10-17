import { PERMISSION_FIELDS, ACTIONS, ActionFields } from '@/constants';
import { UserForm, UserFormat } from '@/types';

/**
 *
 * @param values values need format form values
 * @returns {UserForm}
 */
export const formatFormValues = (values: UserForm): UserFormat => {
  const permissions = {
    documents: {
      read: false,
      write: false,
      delete: false,
    },
    photos: {
      read: false,
      write: false,
      delete: false,
    },
    users: {
      read: false,
      write: false,
      delete: false,
    },
  };

  PERMISSION_FIELDS.forEach((field) => {
    ACTIONS.forEach((action) => {
      const actionKey = action.toLowerCase() as Lowercase<ActionFields>;
      const permissionKey = `${field}${action}` as keyof UserForm;

      permissions[field][actionKey] = values[permissionKey] === 'on';
      delete values[permissionKey];
    });
  });

  return { ...values, permissions: permissions };
};
