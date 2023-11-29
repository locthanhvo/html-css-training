import SortIcon from '@assets/icons/sort-icon.svg'

export enum STATUS {
  ACTIVE = 'Active',
  WAIT = 'Wait',
  OFFLINE = 'Offline',
}

export const FILTER_OPTIONS = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Offline' },
  { id: 3, name: 'Wait' },
]

export const FILTER_MOBILE = [
  { id: 1, name: 'Status' },
  { id: 2, name: 'Active' },
  { id: 3, name: 'Offline' },
  { id: 4, name: 'Wait' },
]

export const ICON_FILTER = {
  ACTIVE: 'Active',
  OFFLINE: 'Offline',
  WAIT: 'Wait',
}

export const COLUMNS = [
  { headerName: 'Users', icon: SortIcon, width: 'lg' },
  { headerName: 'Status', width: 'md' },
  { headerName: 'E-mail', width: 'lg' },
  { headerName: 'Date', width: 'xl' },
  { headerName: 'Actions', width: 'xl' },
]

export const STATUS_OPTIONS = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Offline' },
  { id: 3, name: 'Wait' },
]

export const SNACKBAR_DURATION = 3000
export const MAX_RETRIES = 3000

export enum SNACKBAR_STATUS {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const OPTION_RECORDS = [
  { id: 1, size: 5 },
  { id: 2, size: 10 },
  { id: 3, size: 25 },
  { id: 4, size: 50 },
  { id: 5, size: 100 },
]

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const PAGE_DEFAULT = 1
export const LIMIT_DEFAULT = 5
export const ORDER_DESC = 'desc'
export const SORT_DEFAULT = 'createdAt'
export const DEBOUNCE_DURATION = 500
