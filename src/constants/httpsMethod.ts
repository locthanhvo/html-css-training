export const API_PATH = {
  BOARDS: '/boards',
  TASKS: '/tasks',
};

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const CDN_KEY = process.env.VITE_CDN_KEY ?? '';
