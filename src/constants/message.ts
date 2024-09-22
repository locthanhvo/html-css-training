export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  EMPTY_DATA: 'No data found',
  UPLOAD_IMAGE:
    'Wrong image format. Only "svg", "png", "jpg" or "gif" are allowed',
  UPLOAD_IMAGE_SIZE: 'Image size should be less than 5MB',
  INVALID_PHONE: 'Please enter 10 digits starting with 0',
  DELETE_USER: 'An error occurred while deleting the user',
  ADD_USER: 'An error occurred while adding the user',
  UPDATE_USER: 'An error occurred while updating the user',
  IMAGE: 'An error occurred while uploading the image',
};

export const SUCCESS_MESSAGES = {
  ADD_USER: 'User added successfully',
  UPDATE_USER: 'User updated successfully',
  DELETE_USER: 'User deleted successfully',
  IMAGE: 'Image uploaded successfully',
};
