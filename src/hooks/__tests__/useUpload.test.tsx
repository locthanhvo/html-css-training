import { useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useUploader, useUploadImages } from '../useUpload';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ERROR_MESSAGES, STATUS } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '@/services';

const mockToast = jest.fn();
const mockDropzone = jest.fn();
const mockMutateAsync = jest.fn();

// Mock the dependencies
jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn(),
}));

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('@/services', () => ({
  uploadFile: jest.fn(),
}));

describe('useUploader', () => {
  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useDropzone as jest.Mock).mockReturnValue(mockDropzone);
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    global.URL.createObjectURL = jest.fn(() => 'mocked-url');

    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUploader());
    expect(result.current.previewURLs).toEqual([]);
    expect(result.current.imageFiles).toEqual([]);
    expect(result.current.isImagesDirty).toBe(false);
  });

  it('should handle removing an image', () => {
    const initialImages = ['image1.jpg', 'image2.jpg'];
    const { result } = renderHook(() => useUploader(initialImages));

    act(() => {
      result.current.handleRemoveImage(0);
    });

    expect(result.current.previewURLs).toEqual(['image2.jpg']);
    expect(result.current.isImagesDirty).toBe(true);
  });

  it('should handle file change and show error for invalid file', () => {
    const invalidFile = new File(['content'], 'test.txt', {
      type: 'text/plain',
    });
    const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

    const { result } = renderHook(() => useUploader([]));

    act(() => {
      result.current.handleFilesChange([invalidFile, validFile]);
    });

    expect(mockToast).toHaveBeenCalledWith({
      description: ERROR_MESSAGES.UPLOAD_IMAGE,
      status: STATUS.ERROR,
    });
    expect(result.current.previewURLs).toEqual([
      URL.createObjectURL(validFile),
    ]);
    expect(result.current.isImagesDirty).toBe(true);
  });

  it('should handle file change when file is null or undefined', () => {
    const { result } = renderHook(() => useUploader([]));

    act(() => {
      result.current.handleFilesChange([null, undefined] as any);
    });

    expect(mockToast).not.toHaveBeenCalled();
    expect(result.current.previewURLs).toEqual([]);
  });

  it('should call uploadFile for each file', async () => {
    const files = [
      new File(['content'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['content'], 'test2.jpg', { type: 'image/jpeg' }),
    ];

    mockMutateAsync.mockImplementation(async (files) =>
      Promise.all(files.map((file: File) => uploadFile(file))),
    );

    const { result } = renderHook(() => useUploadImages());

    await waitFor(async () => {
      await result.current.uploadImages(files);
    });

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(files);
      expect(uploadFile).toHaveBeenCalledTimes(files.length);
      expect(uploadFile).toHaveBeenCalledWith(files[0]);
      expect(uploadFile).toHaveBeenCalledWith(files[1]);
    });
  });
});
