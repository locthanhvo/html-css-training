'use client';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

// Constants
import { ERROR_MESSAGES, MAX_SIZE, REGEX } from '@/constants';

// Icons
import { ImageIcon } from '@/icons';

// Utils
import { generateRGBDataURL } from '@/utils';

interface TUploadImageProps {
  imageUrl?: string;
  onFileChange: (file: File) => void;
}

const UploadImage = ({ onFileChange, imageUrl = '' }: TUploadImageProps) => {
  const [imagePreview, setImagePreview] = useState<string>(imageUrl);
  const [imageError, setImageError] = useState<string>('');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files && event.target.files[0]) as File;

    // Check type of image
    if (!REGEX.IMG.test(file.name)) {
      return setImageError(ERROR_MESSAGES.UPLOAD_IMAGE);
    }

    // Check size of image
    if (file?.size > MAX_SIZE) {
      return setImageError(ERROR_MESSAGES.UPLOAD_IMAGE_SIZE);
    }

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreview(imageUrl);

      onFileChange(file);
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {!!imagePreview && (
        <div className="rounded-full bg-primary w-12 h-12 relative overflow-hidden">
          <Image
            src={imagePreview}
            alt="Image Preview"
            className="rounded-full bg-lightgray bg-center bg-cover bg-no-repeat"
            fill
            priority
            placeholder="blur"
            blurDataURL={generateRGBDataURL(64, 64, 64)}
            sizes="48px"
          />
        </div>
      )}

      <div className="mb-4 w-[300px] p-6 flex flex-col items-center justify-center bg-midNightBlue rounded">
        <ImageIcon />

        <label
          className="block text-[10px] cursor-pointer font-medium text-secondary mb-2"
          htmlFor="imageInput"
        >
          <span className="text-primary">Click to upload</span> or drag and drop
        </label>

        <label
          className="block text-[10px] cursor-pointer font-medium text-secondary mb-2"
          htmlFor="imageInput"
        >
          SVG, PNG, JPG or GIF (max. 800 x 400px)
        </label>
        <input
          type="file"
          id="imageInput"
          className="border p-2 w-full"
          accept="image/*"
          onChange={handleImageUpload}
          required
          hidden
        />
        {imageError && (
          <p className="mt-2 text-[8px] text-red-600">{imageError}</p>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
