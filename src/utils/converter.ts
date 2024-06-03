import { AUTH_SCHEMA } from '@/constants';
import { TField } from '@/types';

export const formatBreadcrumb = (pathname: string) => {
  const pathArray = pathname.split('/');
  const breadcrumbs: { breadcrumbName: string; pathName: string }[] = [];

  let currentPath = '';

  pathArray.forEach((part) => {
    if (part !== '') {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      breadcrumbs.push({
        breadcrumbName: part.replace(/-/g, ' '),
        pathName: currentPath,
      });
    }
  });

  return breadcrumbs;
};

export const displayFieldAuthForm = (isRegister: boolean) => {
  return [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'text',
      rules: AUTH_SCHEMA.EMAIL,
      ariaLabel: 'email',
    },
    isRegister && {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone',
      type: 'text',
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
    isRegister && {
      name: 'confirmPassword',
      label: 'Confirm password',
      placeholder: 'Confirm password',
      type: 'password',
      rules: AUTH_SCHEMA.CONFIRM_PASSWORD,
      ariaLabel: 'confirmPassword',
    },
  ].filter(Boolean) as Array<TField>;
};
