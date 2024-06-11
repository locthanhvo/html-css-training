import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Box, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import { generatePath, useNavigate } from 'react-router-dom';

// Components
import {
  ActionButton,
  Dropdown,
  InputField,
  Modal,
  Pagination,
  Status,
  Table,
  ConfirmModal,
} from '@/components';

// Icons
import { AddIcon, SearchIcon } from '@/components/Icons';

// Constants
import {
  EMAIL_ADMIN,
  ERROR_MESSAGES,
  PAGE_SIZE,
  PRIVATE_ROUTERS,
  SEARCH_USER_FIELDS,
  STATUS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Hooks
import {
  useDebounce,
  useDeleteUser,
  useGetUserList,
  usePagination,
} from '@/hooks';

// Types
import { TDataSource, TError, TUser, TUserList } from '@/types';

// Utils
import { customToast } from '@/utils';

// Stores
import { authStore } from '@/stores';

const UserListPage = () => {
  const navigate = useNavigate();
  const userAuth = authStore((state) => state.user);
  const toast = useToast();
  const [searchField, setSearchField] = useState<string>(
    SEARCH_USER_FIELDS[0].value,
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const actionItem = useRef<TUser | null>(null);

  const handleOpenConfirmModal = useCallback(() => {
    setIsOpenConfirmModal((prev) => !prev);
  }, [setIsOpenConfirmModal]);

  const handleOnSelectSearchField = useCallback(
    (value: string) => {
      setSearchField(value);
    },
    [setSearchField],
  );

  const handleChangeSearch = useDebounce(
    (value: string) => {
      setSearchValue(value);
    },
    [setSearchValue],
  );

  const { users, isUserListLoading } = useGetUserList({
    page: currentPage,
    ...(searchValue?.length && { filter: { [searchField]: searchValue } }),
  });

  const { handleDeleteUser, isDeleteLoading } = useDeleteUser();

  const {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  } = usePagination(users as TUserList, currentPage, setCurrentPage);

  const renderColumns = useMemo(
    () => [
      {
        title: 'Username',
        key: 'userName',
        renderBody: ({ userName }: TDataSource) => (
          <Flex alignItems="center" gap="10px">
            <Text
              fontSize="xs"
              color="gray.800"
              fontWeight="regular"
              textAlign="left"
              whiteSpace="break-spaces"
              noOfLines={1}
            >
              {userName}
            </Text>
          </Flex>
        ),
      },
      {
        title: 'First name',
        key: 'firstName',
      },
      {
        title: 'E-Mails',
        key: 'email',
      },
      {
        title: 'Phone',
        key: 'phone',
      },
      {
        title: 'Status',
        key: 'status',
        renderBody: ({ status }: TDataSource) => (
          <Flex alignItems="center" gap="10px">
            <Status variant={status as STATUS} />
          </Flex>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        renderBody: ({ id, email }: TDataSource) => (
          <Flex gap={2}>
            <ActionButton
              size="sm"
              title="Edit"
              bgColor="primary"
              color="blue.100"
              borderColor="blue.100"
              onClick={() => handleNavigateEditUser(id)}
              isDisabled={
                email === EMAIL_ADMIN && userAuth.email !== EMAIL_ADMIN
              }
            />
            <ActionButton
              size="sm"
              title="Delete"
              bgColor="red.900"
              isDisabled={email === EMAIL_ADMIN}
              onClick={() => {
                actionItem.current = { id, email } as TUser;
                handleOpenConfirmModal();
              }}
            />
          </Flex>
        ),
      },
    ],
    [],
  );

  const handleNavigateEditUser = useCallback(
    (id?: string) => navigate(generatePath(PRIVATE_ROUTERS.USER_EDIT, { id })),
    [navigate],
  );

  const handleNavigateAddUser = useCallback(
    () => navigate(PRIVATE_ROUTERS.USER_ADD),
    [navigate],
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (actionItem.current?.email === userAuth.email) {
        toast(
          customToast({
            title: ERROR_MESSAGES.DELETE_YOURSELF,
            status: TOAST_STATUS.ERROR,
          }),
        );
      } else {
        await handleDeleteUser({
          id: actionItem.current?.id as string,
        });

        toast(
          customToast({
            title: SUCCESS_MESSAGES.DELETE_SUCCESS,
            status: TOAST_STATUS.SUCCESS,
          }),
        );
      }
    } catch (error) {
      toast(
        customToast({
          title: ERROR_MESSAGES.DELETE_FAILED,
          description: (error as TError).message,
          status: TOAST_STATUS.ERROR,
        }),
      );
    }
    handleOpenConfirmModal();
  }, [handleDeleteUser, handleOpenConfirmModal, toast]);

  return (
    <VStack w="full" gap={4} alignItems="flex-start">
      <Box mt={1} w="full">
        <InputField
          bgColor="primary"
          leftIcon={<SearchIcon />}
          onChange={handleChangeSearch}
          placeholder="Which user are you looking for..."
        />
      </Box>

      <Dropdown
        width="150px"
        options={SEARCH_USER_FIELDS}
        onSelect={handleOnSelectSearchField}
      />

      <ActionButton
        size="lg"
        title="Add User"
        bgColor="blue.200"
        rightIcon={<AddIcon />}
        onClick={handleNavigateAddUser}
      />

      <Flex
        w="full"
        bgColor="gray.150"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          direction="column"
          p={8}
          borderRadius="lg"
          bgColor="primary"
          w="full"
        >
          <Table
            isLoading={isUserListLoading}
            columns={renderColumns}
            dataSource={users?.data}
          />

          <Pagination
            isDisableNext={isDisableNext}
            isDisabledPrev={isDisablePrev}
            totalRecords={`${users?.items ?? 0} items`}
            pageSize={PAGE_SIZE}
            arrOfCurrButtons={pageArray}
            currentPage={currentPage}
            onClickPage={handleChangePageNumber}
            onPageChange={handleChangePage}
          />
        </Flex>
      </Flex>
      {isOpenConfirmModal && (
        <Modal
          isOpen={isOpenConfirmModal}
          onClose={handleOpenConfirmModal}
          body={
            <ConfirmModal
              title="Are you sure you want to delete this user?"
              itemName={actionItem.current?.email}
              isLoading={isDeleteLoading}
              isDisabled={isDeleteLoading}
              onConfirm={handleConfirmDelete}
              onCloseModal={handleOpenConfirmModal}
            />
          }
        />
      )}
    </VStack>
  );
};

export default memo(UserListPage);
