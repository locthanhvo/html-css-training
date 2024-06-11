import { memo, useCallback } from 'react';
import { Text, VStack, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Components
import { Fallback, UserForm } from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  PRIVATE_ROUTERS,
  STATUS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Hooks
import { useAuth, useCreateUser, useEditUser, useGetUserDetail } from '@/hooks';

// Types
import { TError, TUser } from '@/types';

// Utils
import { customToast } from '@/utils';

const UserActionPage = () => {
  const toast = useToast();
  const { users } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const { userDetail, isUserLoading } = useGetUserDetail(id ?? '');
  const { handleCreateUser } = useCreateUser();
  const { handleEditUser } = useEditUser();

  const handleSubmit = useCallback(
    async (data: TUser) => {
      try {
        const isUser = users?.some(
          (user) =>
            user.email === data.email && userDetail?.email !== user.email,
        );

        if (isUser) {
          toast(
            customToast({
              title: ERROR_MESSAGES.USER_EXISTS,
              status: TOAST_STATUS.ERROR,
            }),
          );
        } else {
          const payload = {
            ...data,
            id: id ?? uuidv4(),
            ...(!isEdit && { status: STATUS.VALID }),
            ...(!isEdit && { createdAt: new Date().toISOString() }),
            updatedAt: new Date().toISOString(),
          };

          isEdit
            ? await handleEditUser({ user: payload })
            : await handleCreateUser({ user: payload });

          toast(
            customToast({
              title: id
                ? SUCCESS_MESSAGES.EDIT_SUCCESS
                : SUCCESS_MESSAGES.ADD_SUCCESS,
              status: TOAST_STATUS.SUCCESS,
            }),
          );

          navigate(PRIVATE_ROUTERS.USERS);
        }
      } catch (error) {
        toast(
          customToast({
            title: id ? ERROR_MESSAGES.EDIT_FAILED : ERROR_MESSAGES.ADD_FAILED,
            description: (error as TError).message,
            status: TOAST_STATUS.ERROR,
          }),
        );
      }
    },
    [
      users,
      userDetail,
      toast,
      id,
      isEdit,
      handleEditUser,
      handleCreateUser,
      navigate,
    ],
  );

  return (
    <VStack
      alignItems="flex-start"
      bgColor="primary"
      p={8}
      borderRadius="lg"
      gap={7}
    >
      <Text fontSize="sm" color="gray.800">
        {isEdit ? 'Edit User' : 'Add User'}
      </Text>
      {isUserLoading && isEdit ? (
        <Fallback />
      ) : (
        <UserForm
          isEdit={isEdit}
          initialValues={userDetail}
          onSubmit={handleSubmit}
        />
      )}
    </VStack>
  );
};

export default memo(UserActionPage);
