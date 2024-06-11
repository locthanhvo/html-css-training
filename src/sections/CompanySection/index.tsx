import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

// Components
import {
  ActionButton,
  Dropdown,
  InputField,
  Modal,
  Pagination,
  Table,
  ConfirmModal,
  CompanyForm,
  Fallback,
} from '@/components';

// Icons
import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from '@/components/Icons';

// Constants
import {
  ERROR_MESSAGES,
  PAGE_SIZE,
  SEARCH_COMPANY_FIELDS,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
} from '@/constants';

// Hooks
import {
  useGetCompanyList,
  useDebounce,
  usePagination,
  useDeleteCompany,
  useCreateCompany,
  useGetCompanyDetail,
  useEditCompany,
} from '@/hooks';

// Types
import { TCompanyList, TDataSource, TError, TCompany } from '@/types';

// Utils
import { customToast } from '@/utils';

const CompanySection = () => {
  const toast = useToast();
  const [searchField, setSearchField] = useState<string>(
    SEARCH_COMPANY_FIELDS[0].value,
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false);
  const actionItem = useRef<TCompany | null>(null);

  const isEdit = !!actionItem.current?.id;

  const handleOpenDeleteModal = useCallback(() => {
    setIsOpenDeleteModal((prev) => !prev);
  }, [isOpenDeleteModal]);

  const handleOpenActionModal = useCallback(() => {
    setIsOpenActionModal((prev) => !prev);
  }, [isOpenActionModal]);

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

  const { companies, isCompanyListLoading } = useGetCompanyList({
    page: currentPage,
    ...(searchValue?.length && { filter: { [searchField]: searchValue } }),
  });

  const {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  } = usePagination(companies as TCompanyList, currentPage, setCurrentPage);

  const { handleDeleteCompany, isDeleteLoading } = useDeleteCompany();

  const { handleCreateCompany } = useCreateCompany();

  const { isEditLoading, companyDetailUpdate, handleEditCompany } =
    useEditCompany({
      page: currentPage,
      ...(searchValue?.length && { filter: { [searchField]: searchValue } }),
    });

  const { companyDetail, isCompanyLoading } = useGetCompanyDetail(
    actionItem.current?.id as string,
  );

  const handleClickDeleteButton = useCallback(
    ({ id, company }: TDataSource) => {
      actionItem.current = { id, company } as TCompany;
      handleOpenDeleteModal();
    },
    [handleOpenDeleteModal],
  );

  const handleClickEditButton = useCallback(
    ({ id }: TDataSource) => {
      actionItem.current = { id } as TCompany;
      handleOpenActionModal();
    },
    [handleOpenActionModal],
  );

  const renderColumns = useMemo(
    () => [
      {
        title: 'Company',
        key: 'company',
      },
      {
        title: 'Country',
        key: 'country',
      },
      {
        title: 'City',
        key: 'city',
      },
      {
        title: 'Branch',
        key: 'branch',
      },
      {
        title: 'E-mail',
        key: 'mainEmail',
      },
      {
        title: 'Phone',
        key: 'phone',
      },
      {
        title: 'Website',
        key: 'website',
      },
      {
        title: 'Responsible Commissioner',
        key: 'commissioner',
      },
      {
        title: 'Action',
        key: 'action',
        renderBody: ({ id, company }: TDataSource) => (
          <Flex>
            <Button
              maxW="21px"
              p={0}
              onClick={() => handleClickDeleteButton({ id, company })}
            >
              <DeleteIcon />
            </Button>

            <Button
              maxW="21px"
              p={0}
              onClick={() => handleClickEditButton({ id })}
            >
              <EditIcon />
            </Button>
          </Flex>
        ),
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: TCompany) => {
      try {
        const id = actionItem.current?.id;

        const payload = {
          id: id ?? uuidv4(),
          ...data,
          ...(!isEdit && { createdAt: new Date().toISOString() }),
          updatedAt: new Date().toISOString(),
        };

        id
          ? await handleEditCompany({ company: payload })
          : await handleCreateCompany({ company: payload });

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
      await handleDeleteCompany({
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
  }, [actionItem, handleDeleteCompany, handleOpenDeleteModal, toast]);

  const handleClickAction = useCallback(() => {
    actionItem.current = null;
    handleOpenActionModal();
  }, [handleOpenActionModal]);

  return (
    <VStack w="full" gap={4} alignItems="flex-start">
      <Flex direction="column" gap={4} mt={1} w="full">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="sm" color="gray.800">
            List of companies
          </Text>
          <ActionButton
            size="md"
            title="Add Company"
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

      <Dropdown
        width="150px"
        options={SEARCH_COMPANY_FIELDS}
        onSelect={handleOnSelectSearchField}
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
            isLoading={isCompanyListLoading}
            columns={renderColumns}
            dataSource={companies?.data}
          />

          <Pagination
            isDisableNext={isDisableNext}
            isDisabledPrev={isDisablePrev}
            totalRecords={`${companies?.items ?? 0} items`}
            pageSize={PAGE_SIZE}
            arrOfCurrButtons={pageArray}
            currentPage={currentPage}
            onClickPage={handleChangePageNumber}
            onPageChange={handleChangePage}
          />
        </Flex>
      </Flex>

      {isOpenDeleteModal && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={handleClickAction}
          body={
            <ConfirmModal
              title="Are you sure you want to delete this company?"
              itemName={actionItem.current?.company}
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
            (isCompanyLoading || isEditLoading) && isEdit ? (
              <Fallback />
            ) : (
              <CompanyForm
                isEdit={isEdit}
                initialValues={
                  companyDetailUpdate?.id === actionItem.current?.id
                    ? companyDetailUpdate
                    : companyDetail
                }
                onSubmit={handleSubmit}
                onCancel={handleClickAction}
              />
            )
          }
        />
      )}
    </VStack>
  );
};

export default memo(CompanySection);
