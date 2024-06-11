import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Flex, Text, GridItem, useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

// Components
import {
  ActionButton,
  InputField,
  Modal,
  Table,
  ConfirmModal,
  Fallback,
  BrigadeForm,
} from '@/components';

// Icons
import { AddIcon, SearchIcon } from '@/components/Icons';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_STATUS } from '@/constants';

// Hooks
import {
  useDebounce,
  useGetBrigadeList,
  useEditBrigade,
  useDeleteBrigade,
  useCreateBrigade,
  useGetBrigadeDetail,
} from '@/hooks';

// Types
import { TDataSource, TError, TBrigade } from '@/types';

// Utils
import { customToast } from '@/utils';

const BrigadesSection = () => {
  const toast = useToast();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false);
  const actionItem = useRef<TBrigade | null>(null);

  const isEdit = !!actionItem.current?.id;

  const handleOpenDeleteModal = useCallback(() => {
    setIsOpenDeleteModal((prev) => !prev);
  }, []);

  const handleOpenActionModal = useCallback(() => {
    setIsOpenActionModal((prev) => !prev);
  }, []);

  const handleChangeSearch = useDebounce(
    (value: string) => {
      setSearchValue(value);
    },
    [setSearchValue],
  );

  const { brigades, isBrigadesListLoading } = useGetBrigadeList({
    ...(searchValue?.length && { filter: { name: searchValue } }),
  });

  const { handleDeleteBrigade, isDeleteLoading } = useDeleteBrigade();

  const { handleCreateBrigade } = useCreateBrigade();

  const { brigadeDetailUpdate, isEditLoading, handleEditBrigade } =
    useEditBrigade({
      ...(searchValue?.length && { filter: { name: searchValue } }),
    });

  const { brigadeDetail, isBrigadeLoading } = useGetBrigadeDetail(
    actionItem.current?.id as string,
  );

  const handleClickDeleteButton = useCallback(
    ({ id, name }: TDataSource) => {
      actionItem.current = { id, name } as TBrigade;
      handleOpenDeleteModal();
    },
    [handleOpenDeleteModal],
  );

  const handleClickEditButton = useCallback(
    ({ id }: TDataSource) => {
      actionItem.current = { id } as TBrigade;
      handleOpenActionModal();
    },
    [handleOpenActionModal],
  );

  const renderColumns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
      },
      {
        title: 'Description',
        key: 'description',
      },
      {
        title: 'Action',
        key: 'action',
        renderBody: ({ id, name }: TDataSource) => (
          <Flex gap={2}>
            <ActionButton
              size="sm"
              title="Edit"
              bgColor="primary"
              color="blue.100"
              borderColor="blue.100"
              onClick={() => handleClickEditButton({ id })}
            />
            <ActionButton
              size="sm"
              title="Delete"
              bgColor="red.900"
              onClick={() => handleClickDeleteButton({ id, name })}
            />
          </Flex>
        ),
      },
    ],
    [handleClickDeleteButton, handleClickEditButton],
  );

  const handleSubmit = useCallback(
    async (data: TBrigade) => {
      try {
        const id = actionItem.current?.id;

        const payload = {
          id: id ?? uuidv4(),
          ...data,
          ...(!isEdit && { createdAt: new Date().toISOString() }),
          updatedAt: new Date().toISOString(),
        };

        id
          ? await handleEditBrigade({ brigade: payload })
          : await handleCreateBrigade({ brigade: payload });

        toast(
          customToast({
            title: SUCCESS_MESSAGES.ADD_SUCCESS,
            status: TOAST_STATUS.SUCCESS,
          }),
        );

        handleOpenActionModal();
      } catch (error) {
        toast(
          customToast({
            title: ERROR_MESSAGES.ADD_FAILED,
            description: (error as TError).message,
            status: TOAST_STATUS.ERROR,
          }),
        );
      }
    },
    [
      handleCreateBrigade,
      handleEditBrigade,
      handleOpenActionModal,
      isEdit,
      toast,
    ],
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      await handleDeleteBrigade({
        id: actionItem.current?.id as string,
      });

      toast(
        customToast({
          title: SUCCESS_MESSAGES.DELETE_SUCCESS,
          status: TOAST_STATUS.SUCCESS,
        }),
      );
    } catch (error) {
      toast(
        customToast({
          title: ERROR_MESSAGES.DELETE_FAILED,
          description: (error as TError).message,
          status: TOAST_STATUS.ERROR,
        }),
      );
    }
    handleOpenDeleteModal();
    actionItem.current = null;
  }, [handleDeleteBrigade, handleOpenDeleteModal, toast]);

  const handleClickAction = useCallback(() => {
    actionItem.current = null;
    handleOpenActionModal();
  }, [handleOpenActionModal]);

  return (
    <GridItem
      w="full"
      gap={4}
      alignItems="flex-start"
      bgColor="white"
      p={8}
      borderRadius="lg"
    >
      <Flex direction="column" gap={4} mt={1} w="full">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="sm" color="gray.800">
            Brigades
          </Text>
          <ActionButton
            size="md"
            title="Add"
            bgColor="blue.200"
            rightIcon={<AddIcon />}
            onClick={handleClickAction}
          />
        </Flex>

        <InputField
          bgColor="primary"
          leftIcon={<SearchIcon />}
          onChange={handleChangeSearch}
          placeholder="Which user are you looking for..."
        />
      </Flex>

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
            isLoading={isBrigadesListLoading}
            columns={renderColumns}
            dataSource={brigades}
          />
        </Flex>
      </Flex>

      {isOpenDeleteModal && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={handleClickAction}
          body={
            <ConfirmModal
              title="Are you sure you want to delete this brigade?"
              itemName={actionItem.current?.name}
              isLoading={isDeleteLoading}
              isDisabled={isDeleteLoading}
              onConfirm={handleConfirmDelete}
              onCloseModal={handleOpenDeleteModal}
            />
          }
        />
      )}

      {isOpenActionModal && (
        <Modal
          maxW="1104px"
          isOpen={isOpenActionModal}
          onClose={handleClickAction}
          body={
            (isBrigadeLoading || isEditLoading) && isEdit ? (
              <Fallback />
            ) : (
              <BrigadeForm
                title={isEdit ? 'Edit Brigade' : 'Add Brigade'}
                isEdit={isEdit}
                initialValues={
                  brigadeDetailUpdate?.id === actionItem.current?.id
                    ? brigadeDetailUpdate
                    : brigadeDetail
                }
                onSubmit={handleSubmit}
                onCancel={handleClickAction}
              />
            )
          }
        />
      )}
    </GridItem>
  );
};

export default memo(BrigadesSection);
