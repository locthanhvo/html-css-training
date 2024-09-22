'use client';

import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// Components
import { Input, Label, Textarea, UploadImage } from '@/components';

// Icons
import { PencilIcon, PhotoIcon } from '@/icons';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES, USER_SCHEMA } from '@/constants';

// Types
import { IUserModel } from '@/types';

// Utils
import { basicFormFields, personalFormFields } from '@/utils';

// Context
import { useMultiForm } from '@/context';

// Services
import { uploadFile } from '@/services';

interface IPersonalForm {
  initialValues?: TPersonalForm;
}

type TPersonalForm = Pick<
  IUserModel,
  | 'name'
  | 'email'
  | 'avatar'
  | 'description'
  | 'phone'
  | 'location'
  | 'position'
  | 'website'
  | 'company'
>;

const PersonalForm = ({ initialValues }: IPersonalForm) => {
  const { forms, setFormField } = useMultiForm();
  const {
    name,
    email,
    avatar,
    description,
    phone,
    location,
    position,
    website,
    company,
  } = forms?.personalForm?.updatedValues || {};

  const { control, clearErrors } = useForm<TPersonalForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: name || initialValues?.name || '',
      email: email || initialValues?.email || '',
      avatar: avatar || initialValues?.avatar || '',
      description: description || initialValues?.description || '',
      phone: phone || initialValues?.phone || '',
      location: location || initialValues?.location || '',
      position: position || initialValues?.position || '',
      website: website || initialValues?.website || '',
      company: company || initialValues?.company || '',
    },
  });

  const handleInputChange = ({
    field,
    data,
    isError,
    onChange,
  }: {
    field: keyof TPersonalForm;
    data: string;
    isError: boolean;
    onChange: (value: string) => void;
  }) => {
    isError && clearErrors(field);
    onChange(data);
    setFormField('personalForm', field, data);
  };

  const handleAvatarChange = async (avatarFile: File) => {
    try {
      const file = await uploadFile(avatarFile);
      setFormField('personalForm', 'avatar', file);

      toast.success(SUCCESS_MESSAGES.IMAGE);
    } catch (error) {
      toast.error(ERROR_MESSAGES.IMAGE);
    }
  };

  return (
    <form>
      <div>
        <h3 className="text-white text-base font-medium">
          Personal information
        </h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        {personalFormFields.map(
          ({
            label,
            key,
            name,
            rules,
            ariaLabel,
            icon: Icon,
            customClass,
            placeholder,
          }) => (
            <div key={key} className={customClass}>
              <Controller
                control={control}
                key={key}
                name={name as keyof TPersonalForm}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    customClass="w-full"
                    labelStartIcon={<Icon />}
                    label={label}
                    placeholder={placeholder}
                    {...field}
                    isError={!!error}
                    errorMessage={error?.message}
                    onChange={(data) =>
                      handleInputChange({
                        field: name as keyof TPersonalForm,
                        data,
                        isError: !!error,
                        onChange: field.onChange,
                      })
                    }
                    aria-label={ariaLabel}
                  />
                )}
              />
            </div>
          ),
        )}

        <div className="py-6 border-b border-slateBlue">
          <Controller
            control={control}
            key="avatar"
            name="avatar"
            rules={USER_SCHEMA.NAME}
            render={() => (
              <div className="flex items-start">
                <Label
                  name="Photo"
                  startIcon={<PhotoIcon />}
                  customClass="text-xs text-white font-medium"
                />

                <UploadImage
                  imageUrl={initialValues?.avatar || avatar}
                  onFileChange={handleAvatarChange}
                />
              </div>
            )}
          />
        </div>

        <div className="py-6">
          <Controller
            control={control}
            key="description"
            name="description"
            rules={USER_SCHEMA.NAME}
            render={({ field, fieldState: { error } }) => (
              <Textarea
                customClass="w-full h-[90px]"
                labelStartIcon={<PencilIcon />}
                label="Short description"
                placeholder="Write a short bio about you..."
                {...field}
                isError={!!error}
                errorMessage={error?.message}
                onChange={(data) =>
                  handleInputChange({
                    field: 'description',
                    data,
                    isError: !!error,
                    onChange: field.onChange,
                  })
                }
                aria-label="description"
              />
            )}
          />
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white text-base font-medium">Basic information</h3>
        <p className="text-secondary text-sm font-medium">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
      </div>

      <div className="w-full border border-slateBlue rounded-xl flex flex-col mt-6 p-[34px]">
        {basicFormFields.map(
          ({
            label,
            key,
            name,
            rules,
            ariaLabel,
            icon: Icon,
            customClass,
            placeholder,
          }) => (
            <div key={key} className={customClass}>
              <Controller
                control={control}
                key={key}
                name={name as keyof TPersonalForm}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    customClass="w-full"
                    labelStartIcon={<Icon />}
                    label={label}
                    placeholder={placeholder}
                    {...field}
                    isError={!!error}
                    errorMessage={error?.message}
                    onChange={(data) =>
                      handleInputChange({
                        field: name as keyof TPersonalForm,
                        data,
                        isError: !!error,
                        onChange: field.onChange,
                      })
                    }
                    aria-label={ariaLabel}
                  />
                )}
              />
            </div>
          ),
        )}
      </div>
    </form>
  );
};

export default PersonalForm;
