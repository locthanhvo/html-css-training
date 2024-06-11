import { AUTH_SCHEMA } from '@/constants';
import { displayFieldAuthForm, formatBreadcrumb } from '../converter';

describe('formatBreadcrumb', () => {
  it('should format breadcrumb for a single path', () => {
    const pathname = '/users';
    const result = formatBreadcrumb(pathname);
    expect(result).toEqual([{ breadcrumbName: 'users', pathName: 'users' }]);
  });

  it('should format breadcrumb for a nested path', () => {
    const pathname = '/users/create';
    const result = formatBreadcrumb(pathname);
    expect(result).toEqual([
      { breadcrumbName: 'users', pathName: 'users' },
      { breadcrumbName: 'create', pathName: 'users/create' },
    ]);
  });

  it('should format breadcrumb and replace dashes with spaces', () => {
    const pathname = '/users/user-profile';
    const result = formatBreadcrumb(pathname);
    expect(result).toEqual([
      { breadcrumbName: 'users', pathName: 'users' },
      { breadcrumbName: 'user profile', pathName: 'users/user-profile' },
    ]);
  });

  it('should handle an empty pathname', () => {
    const pathname = '';
    const result = formatBreadcrumb(pathname);
    expect(result).toEqual([]);
  });
});

describe('displayFieldAuthForm', () => {
  it('should return fields for login form', () => {
    const expectedFields = [
      {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'text',
        rules: AUTH_SCHEMA.EMAIL,
        ariaLabel: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        rules: AUTH_SCHEMA.PASSWORD,
        ariaLabel: 'password',
      },
    ];

    const result = displayFieldAuthForm(false);

    expect(result).toEqual(expectedFields);
  });

  it('should return fields for registration form', () => {
    const expectedFields = [
      {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'text',
        rules: AUTH_SCHEMA.EMAIL,
        ariaLabel: 'email',
      },
      {
        name: 'phone',
        label: 'Phone',
        placeholder: 'Phone',
        type: 'number',
        rules: AUTH_SCHEMA.PHONE,
        ariaLabel: 'phone',
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        rules: AUTH_SCHEMA.PASSWORD,
        ariaLabel: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm password',
        placeholder: 'Confirm password',
        type: 'password',
        rules: AUTH_SCHEMA.CONFIRM_PASSWORD,
        ariaLabel: 'confirmPassword',
      },
    ];

    const result = displayFieldAuthForm(true);

    expect(result).toEqual(expectedFields);
  });
});
