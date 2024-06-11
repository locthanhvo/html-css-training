// Constants
import { AUTH_SCHEMA, COMPANY_SCHEMA, USER_SCHEMA } from '@/constants';

// Types
import {
  PaginationTableType,
  TAuthForm,
  TCompany,
  TDataSource,
  TField,
  THeaderTable,
  TUser,
} from '@/types';

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

export const formatDateString = (dateString?: string): string => {
  let date = new Date(dateString ?? new Date());

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');

  let formattedDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateStr;
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
    isRegister && {
      name: 'confirmPassword',
      label: 'Confirm password',
      placeholder: 'Confirm password',
      type: 'password',
      rules: AUTH_SCHEMA.CONFIRM_PASSWORD,
      ariaLabel: 'confirmPassword',
    },
  ].filter(Boolean) as Array<TField<Omit<TAuthForm, 'isAcceptPrivacyPolicy'>>>;
};

export const displayFieldUserForm = (isEdit: boolean) => {
  return [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'text',
      rules: USER_SCHEMA.EMAIL,
      ariaLabel: 'email',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone',
      type: 'text',
      rules: USER_SCHEMA.PHONE,
      ariaLabel: 'phone',
    },
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      type: 'text',
      rules: USER_SCHEMA.FIRST_NAME,
      ariaLabel: 'firstName',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      type: 'text',
      rules: USER_SCHEMA.LAST_NAME,
      ariaLabel: 'lastName',
    },
    isEdit && {
      name: 'createdAt',
      label: 'Created At',
      placeholder: 'Created At',
      type: 'datetime-local',
      rules: USER_SCHEMA.CREATED_AT,
      ariaLabel: 'createdAt',
    },
    isEdit && {
      name: 'updatedAt',
      label: 'Updated At',
      placeholder: 'Updated At',
      type: 'datetime-local',
      rules: USER_SCHEMA.UPDATED_AT,
      ariaLabel: 'updatedAt',
    },
  ].filter(Boolean) as Array<TField<Omit<TUser, 'password'>>>;
};

export const displayFieldCompanyForm = () => {
  return [
    {
      name: 'company',
      label: 'Company',
      placeholder: 'Company',
      type: 'text',
      rules: COMPANY_SCHEMA.COMPANY,
      ariaLabel: 'company',
    },
    {
      name: 'branch',
      label: 'Branch',
      placeholder: 'Branch',
      type: 'text',
      elementType: 'dropdown',
      rules: COMPANY_SCHEMA.BRANCH,
      ariaLabel: 'branch',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone',
      type: 'text',
      rules: COMPANY_SCHEMA.PHONE,
      ariaLabel: 'phone',
    },
    {
      name: 'website',
      label: 'Website',
      placeholder: 'Website',
      type: 'text',
      rules: COMPANY_SCHEMA.WEBSITE,
      ariaLabel: 'website',
    },
    {
      name: 'gpsLatitude',
      label: 'GPS latitude',
      placeholder: 'GPS latitude',
      type: 'text',
      rules: COMPANY_SCHEMA.GPS_LATITUDE,
      ariaLabel: 'gps_latitude',
    },
    {
      name: 'gpsLongitude',
      label: 'GPS Longitude',
      placeholder: 'GPS Longitude',
      type: 'text',
      rules: COMPANY_SCHEMA.GPS_LONGITUDE,
      ariaLabel: 'gps_longitude',
    },
    {
      name: 'country',
      label: 'Country',
      placeholder: 'Country',
      type: 'text',
      elementType: 'dropdown',
      rules: COMPANY_SCHEMA.COUNTRY,
      ariaLabel: 'country',
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'City',
      type: 'text',
      elementType: 'dropdown',
      rules: COMPANY_SCHEMA.CITY,
      ariaLabel: 'city',
    },
    {
      name: 'mainEmail',
      label: 'Main Email',
      placeholder: 'Main Email',
      type: 'email',
      rules: COMPANY_SCHEMA.MAIN_EMAIL,
      ariaLabel: 'mainEmail',
    },
    {
      name: 'secondaryEmail',
      label: 'Secondary Email',
      placeholder: 'Secondary Email',
      type: 'email',
      rules: COMPANY_SCHEMA.SECONDARY_EMAIL,
      ariaLabel: 'secondaryEmail',
    },
    {
      name: 'commissioner',
      label: 'Commissioner',
      placeholder: 'Commissioner',
      type: 'text',
      rules: COMPANY_SCHEMA.COMMISSIONER,
      ariaLabel: 'Commissioner',
    },
  ].filter(Boolean) as Array<TField<TCompany>>;
};

export const formatNumberButton = (numberOfPage: number): number[] =>
  Array.from({ length: numberOfPage }).map(
    (_, index: number): number => index + 1,
  );

export const formatPageArray = ({
  totalPage,
  currentPage,
  arrOfCurrButtons,
}: PaginationTableType): (string | number)[] => {
  const DOTS = '...';
  const numberOfPage = Math.ceil(totalPage);
  let tempNumberOfButtons = arrOfCurrButtons;

  if (formatNumberButton(numberOfPage).length <= 4) {
    const numberOfPages = Array.from(
      { length: formatNumberButton(numberOfPage).length },
      (_, index) => index + 1,
    );
    tempNumberOfButtons = numberOfPages;
  } else {
    const rangeStart = Math.max(1, currentPage - 1);
    const rangeEnd = Math.min(
      currentPage + 1,
      formatNumberButton(numberOfPage).length,
    );
    tempNumberOfButtons = [
      ...(rangeEnd >= formatNumberButton(numberOfPage).length - 1
        ? [
            ...(formatNumberButton(numberOfPage).length - 3 > 1
              ? Array.from(
                  { length: 3 },
                  (_, i) => formatNumberButton(numberOfPage).length - 4 + i,
                )
              : []),
            formatNumberButton(numberOfPage).length - 1,
            formatNumberButton(numberOfPage).length,
          ]
        : [
            rangeStart,
            rangeStart + 1,
            rangeStart + 2,
            DOTS,
            formatNumberButton(numberOfPage).length,
          ]),
    ].filter((button) => button !== null);
  }

  return tempNumberOfButtons;
};

export const processTableData = (
  columns: THeaderTable[],
  dataSource: TDataSource[],
) => {
  return dataSource.map((data) => {
    return {
      id: data.id,
      cells: columns.map((column) => ({
        key: `${data.id}-${column.key}`,
        content: column.renderBody
          ? column.renderBody(data)
          : data[column.key as keyof typeof data],
        tooltipLabel: data[column.key as keyof typeof data],
      })),
    };
  });
};
