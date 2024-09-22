'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Context
import { useMultiForm } from '@/context';

// Components
import { NotificationForm } from '@/components/Form';

// Services
import { addUser, updateUser } from '@/actions';

// Types
import { IUserModel } from '@/types';

// Constants
import { ERROR_MESSAGES, ROUTES, SUCCESS_MESSAGES } from '@/constants';

interface NotificationProps {
  initialValues?: IUserModel;
}

const Notification = ({ initialValues }: NotificationProps) => {
  const { forms } = useMultiForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnActions = async () => {
    try {
      setIsLoading((prev) => !prev);

      const payload = {
        ...forms?.personalForm?.updatedValues,
        ...forms?.teamForm?.updatedValues,
        ...forms?.billForm?.updatedValues,
        ...forms?.notificationForm?.updatedValues,

        status: 'online',
      };

      !initialValues?.id
        ? await addUser(payload as IUserModel)
        : await updateUser(initialValues.id, payload as IUserModel);

      toast.success(
        !initialValues?.id
          ? SUCCESS_MESSAGES.ADD_USER
          : SUCCESS_MESSAGES.UPDATE_USER,
      );
      router.push(`/users${ROUTES.USER_LIST}`);
    } catch (error) {
      toast.error(
        !initialValues?.id
          ? ERROR_MESSAGES.ADD_USER
          : ERROR_MESSAGES.UPDATE_USER,
      );
    } finally {
      setIsLoading((prev) => !prev);
    }
  };

  const disabled =
    !!forms?.personalForm?.updatedValues &&
    !!forms?.teamForm?.updatedValues &&
    !!forms?.billForm?.updatedValues;

  return (
    <NotificationForm
      initialValues={initialValues}
      createItemAction={handleOnActions}
      disabled={(!initialValues?.id && !disabled) || isLoading}
    />
  );
};

export default Notification;
