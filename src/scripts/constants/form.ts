export enum Permission {
  Users = 'users',
  Photos = 'photos',
  Documents = 'documents',
}

export enum PermissionForm {
  DocumentsDelete = 'documentsDelete',
  DocumentsWrite = 'documentsWrite',
  DocumentsRead = 'documentsRead',
  PhotosDelete = 'photosDelete',
  PhotosWrite = 'photosWrite',
  PhotosRead = 'photosRead',
  UsersDelete = 'usersDelete',
  UsersWrite = 'usersWrite',
  UsersRead = 'usersRead',
}

export const PERMISSION_FIELDS: Permission[] = [
  Permission.Users,
  Permission.Photos,
  Permission.Documents,
];

export enum ActionFields {
  Read = 'Read',
  Write = 'Write',
  Delete = 'Delete',
}

export const ACTIONS: ActionFields[] = [
  ActionFields.Read,
  ActionFields.Write,
  ActionFields.Delete,
];
