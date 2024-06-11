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
  ControlForm,
} from '@/components';

// Icons
import { AddIcon, SearchIcon } from '@/components/Icons';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_STATUS } from '@/constants';

// Hooks
import {
  useDebounce,
  useGetControlTeamsList,
  useEditControlTeam,
  useCreateControlTeam,
  useDeleteControlTeam,
  useGetControlTeamDetail,
} from '@/hooks';

// Types
import { TDataSource, TError, TControl } from '@/types';

// Utils
import { customToast } from '@/utils';

const ControlTeamsSection = () => {
  const toast = useToast();

  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false);
  const actionItem = useRef<TControl | null>(null);

  const isEdit = !!actionItem.current?.id;

  const handleOpenDeleteModal = useCallback(() => {
    setIsOpenDeleteModal((prev) => !prev);
  }, [isOpenDeleteModal]);

  const handleOpenActionModal = useCallback(() => {
    setIsOpenActionModal((prev) => !prev);
  }, [isOpenActionModal]);

  const handleChangeSearch = useDebounce(
    (value: string) => {
      setSearchValue(value);
    },
    [setSearchValue],
  );

  const { controlTeams, isControlTeamsListLoading } = useGetControlTeamsList({
    ...(searchValue?.length && { filter: { name: searchValue } }),
  });

  const { handleDeleteControlTeam, isDeleteLoading } = useDeleteControlTeam();

  const { handleCreateControlTeams } = useCreateControlTeam();

  const { isEditLoading, controlTeamDetailUpdate, handleEditControlTeam } =
    useEditControlTeam({
      ...(searchValue?.length && { filter: { name: searchValue } }),
    });

  const { controlTeamDetail, isDetailLoading } = useGetControlTeamDetail(
    actionItem.current?.id as string,
  );

  const handleClickDeleteButton = useCallback(
    ({ id, name }: TDataSource) => {
      actionItem.current = { id, name } as TControl;
      handleOpenDeleteModal();
    },
    [handleOpenDeleteModal],
  );

  const handleClickEditButton = useCallback(
    ({ id }: TDataSource) => {
      actionItem.current = { id } as TControl;
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
    [],
  );

  const handleSubmit = useCallback(
    async (data: TControl) => {
      try {
        const id = actionItem.current?.id;

        const payload = {
          id: id ?? uuidv4(),
          ...data,
          ...(!isEdit && { createdAt: new Date().toISOString() }),
          updatedAt: new Date().toISOString(),
        };

        id
          ? await handleEditControlTeam({ control: payload })
          : await handleCreateControlTeams({ control: payload });

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
    [toast],
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      await handleDeleteControlTeam({
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
  }, [actionItem, handleDeleteControlTeam, handleOpenDeleteModal, toast]);

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
            List of control teams
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
            isLoading={isControlTeamsListLoading}
            columns={renderColumns}
            dataSource={controlTeams}
          />
        </Flex>
      </Flex>

      {isOpenDeleteModal && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={handleClickAction}
          body={
            <ConfirmModal
              title="Are you sure you want to delete this control team?"
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
            (isDetailLoading || isEditLoading) && isEdit ? (
              <Fallback />
            ) : (
              <ControlForm
                title={isEdit ? 'Edit Control Team' : 'Add Control Team'}
                isEdit={isEdit}
                initialValues={
                  controlTeamDetailUpdate?.id === actionItem.current?.id
                    ? controlTeamDetailUpdate
                    : controlTeamDetail
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

export default memo(ControlTeamsSection);
