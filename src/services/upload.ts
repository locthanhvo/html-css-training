import { CDN_KEY } from '@/constants';

export const uploadFile = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append('image', file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${CDN_KEY}`,
    {
      method: 'POST',
      body: form,
    },
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const resData = await response.json();
  return resData.data.image.url || '';
};
