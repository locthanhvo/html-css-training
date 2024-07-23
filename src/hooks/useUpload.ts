import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';

// Constants
import { ERROR_MESSAGES, FILE_IMAGE, REGEX, STATUS } from '@/constants';

// Services
import { uploadFile } from '@/services';

export const useUploader = (imageURLs: string[] = []) => {
  const [previewURLs, setPreviewURLs] = useState<string[] | []>(imageURLs);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [isImagesDirty, setIsImagesDirty] = useState<boolean>(false);

  const toast = useToast();

  const handleShowErrorMessage = useCallback(
    (message: string) => {
      toast({
        description: message,
        status: STATUS.ERROR,
      });
    },
    [toast],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const updatedImages = [...previewURLs];
      const updatedFiles = [...imageFiles];
      updatedImages.splice(index, 1);
      updatedFiles.splice(index, 1);

      setPreviewURLs(updatedImages);
      setImageFiles(updatedFiles);
      setIsImagesDirty(true);
    },
    [imageFiles, previewURLs],
  );

  const handleFilesChange = useCallback(
    (files: File[]) => {
      const imagesPreview: string[] = [];

      files.forEach((file) => {
        if (!file) {
          return;
        }

        // Check type of image
        if (!REGEX.IMG.test(file.name)) {
          return handleShowErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE);
        }

        const previewImage: string = URL.createObjectURL(file);
        imagesPreview.push(previewImage);
      });

      setImageFiles(files);
      setPreviewURLs(imagesPreview);
      setIsImagesDirty(true);
    },
    [handleShowErrorMessage],
  );

  const { getRootProps, getInputProps, isFileDialogActive } = useDropzone({
    multiple: true,
    accept: {
      [FILE_IMAGE.JPEG]: [],
      [FILE_IMAGE.PNG]: [],
      [FILE_IMAGE.WEBP]: [],
      [FILE_IMAGE.HEIC]: [],
      [FILE_IMAGE.JFIF]: [],
    },
    onDrop: handleFilesChange,
  });

  return {
    getRootProps,
    getInputProps,
    handleRemoveImage,
    handleFilesChange,
    isFileDialogActive,
    previewURLs,
    imageFiles,
    isImagesDirty,
  };
};

export const useUploadImages = () => {
  const { mutateAsync: uploadImages, isPending: isLoadingUploadImages } =
    useMutation({
      mutationFn: async (file: File[]) =>
        Promise.all(file.map((file) => uploadFile(file))),
    });

  return { isLoadingUploadImages, uploadImages };
};
