import { ERROR_MESSAGES } from './message';

export const TASK_SCHEMA = {
  TITLE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Title'),
  },
};

export enum FILE_IMAGE {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  HEIC = 'image/heic',
  JFIF = 'image/jfif',
}
