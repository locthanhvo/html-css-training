import Form from '@components/Modal/ModalForm'
import useSnackBar from '@hooks/SnackBar'
import SnackBar from '@components/common/SnackBar'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CONFIRM_MESSAGE, DEBOUNCE_DURATION, SNACKBAR_MESSAGE, SNACKBAR_STATUS } from '@constants'
import { validateForm, validateUserForm } from '@helpers'
import { CheckBox, CustomError, UserField } from '@types'
import { useUser } from '@contexts'
import './userPage.css'
import { debounce } from '@helpers'
import Header from './Header'
import LoadingIndicator from '@components/common/LoadingIndicator'
import Confirm from '@components/Modal/ModalConfirm'
import usePagination from '@hooks/Pagination'
import Pagination from '@components/common/Pagination'
import Table from '@components/Table'
import UserCard from '@components/UserCard'

const UserPage = () => {
  const {
    handleAddUser,
    handleSearchUser,
    handleFilterStatus,
    handleLimitUser,
    handlePaginationPage,
    resetUserData,
    updateChangeField,
    handleDeleteUser,
    handleDetailUser,
    handleEditUser,
    handleDeleteMultipleUser,
    setUserData,
    getData,
    initialState,
    userData,
    users,
    query,
  } = useUser()
  const { SnackBar: snackBarState, showSnackBar, clearSnackBar } = useSnackBar()
  const {
    isActiveNextIcon,
    isActivePreviousIcon,
    isLoadingIndicator,
    handleLimitList,
    handleNextPageList,
    handlePreviousPageList,
    hasPagination,
  } = usePagination(handlePaginationPage, handleLimitUser, showSnackBar, users)
  const [errorMessage, setErrorMessage] = useState<UserField>(initialState)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false)
  const [isOpenConfirmMultipleDelete, setIsOpenConfirmMultipleDelete] = useState(false)
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const [userId, setUserId] = useState('')
  const filterOptionRef = useRef('')

  useEffect(() => {
    getData(query)
  }, [])

  const handleCloseForm = () => {
    setIsOpenForm((prevState) => !prevState)

    userData.id && resetUserData()
    setErrorMessage(initialState)
  }

  const toggleConfirmDelete = () => {
    setIsOpenConfirmDelete((prevState) => !prevState)
  }

  const toggleConfirmMultipleDelete = () => {
    setIsOpenConfirmMultipleDelete((prevState) => !prevState)
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateChangeField({ [e.target.name]: e.target.value })
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidForm: UserField | null = validateForm(userData, validateUserForm)

    if (isValidForm) {
      return setErrorMessage(isValidForm)
    }

    try {
      setIsLoadingForm((prevState) => !prevState)
      await handleAddUser(userData)

      resetUserData()
      showSnackBar(SNACKBAR_MESSAGE.ADD_SUCCESS, SNACKBAR_STATUS.SUCCESS)

      handleCloseForm()
    } catch (error) {
      const customError = error as CustomError

      showSnackBar(customError.message, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingForm((prevState) => !prevState)
  }

  const handleSearchList = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchUser(e.target.value)
  }, DEBOUNCE_DURATION)

  const handleFilterList = async (option: string | ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = typeof option === 'string' ? option : option.target.value

    if (selectedValue === filterOptionRef.current) {
      setSelectedFilterOption('')
      handleFilterStatus('')

      filterOptionRef.current = ''
    } else {
      setSelectedFilterOption(selectedValue)
      handleFilterStatus(selectedValue)

      filterOptionRef.current = selectedValue
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const isValidForm: UserField | null = validateForm(userData, validateUserForm)

    if (isValidForm) {
      return setErrorMessage(isValidForm)
    }

    try {
      setIsLoadingForm((prevState) => !prevState)
      await handleEditUser(userData.id, userData)

      resetUserData()
      showSnackBar(SNACKBAR_MESSAGE.UPDATE_SUCCESS, SNACKBAR_STATUS.SUCCESS)

      handleCloseForm()
    } catch (error) {
      const customError = error as CustomError

      showSnackBar(customError.message, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingForm((prevState) => !prevState)
  }

  const handleOpenConfirmModal = (id: string) => {
    setUserId(id)
    toggleConfirmDelete()
  }

  const handleOpenFormDetail = async (id: string) => {
    const userDetail = await handleDetailUser(id)

    setUserData(userDetail)
    handleCloseForm()
  }

  const handleCheckboxChange = ({ isChecked, checkboxId }: CheckBox) => {
    setChecked((prevState) => {
      return isChecked
        ? Array.from(new Set([...prevState, checkboxId]))
        : prevState.filter((item) => item !== checkboxId)
    })
  }

  const handleDeleteMultiple = async () => {
    setIsLoadingForm((prevState) => !prevState)
    try {
      await handleDeleteMultipleUser(checked)

      showSnackBar(SNACKBAR_MESSAGE.REMOVE_SUCCESS, SNACKBAR_STATUS.SUCCESS)
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_FAILED, SNACKBAR_STATUS.ERROR)
    }

    setIsLoadingForm((prevState) => !prevState)
    setChecked([])
    toggleConfirmMultipleDelete()
  }

  const handleConfirmDelete = async () => {
    setIsLoadingForm((prevState) => !prevState)
    try {
      await handleDeleteUser(userId)

      showSnackBar(SNACKBAR_MESSAGE.REMOVE_SUCCESS, SNACKBAR_STATUS.SUCCESS)
    } catch (error) {
      showSnackBar(SNACKBAR_MESSAGE.REMOVE_FAILED, SNACKBAR_STATUS.ERROR)
    }
    setIsLoadingForm((prevState) => !prevState)
    toggleConfirmDelete()
  }

  const handleOpenConfirmDeleteMultiple = () => {
    toggleConfirmMultipleDelete()
  }

  return (
    <main className='main-container'>
      <Header
        checked={checked.length}
        selected={selectedFilterOption}
        onChangeSearch={handleSearchList}
        onClickSelectOption={handleFilterList}
        onOpenForm={handleCloseForm}
        onDeleteMultiple={handleOpenConfirmDeleteMultiple}
      />

      <div className='main-content'>
        <Table
          onChangeCheckbox={handleCheckboxChange}
          data={users}
          onClickDelete={handleOpenConfirmModal}
          onClickEdit={handleOpenFormDetail}
        />

        <UserCard
          onChangeCheckbox={handleCheckboxChange}
          data={users}
          onClickDelete={handleOpenConfirmModal}
          onClickEdit={handleOpenFormDetail}
        />
      </div>

      <div className='main-footer'>
        {hasPagination && (
          <Pagination
            isActiveNextIcon={isActiveNextIcon}
            isActivePreviousIcon={isActivePreviousIcon}
            onChangeLimitPagination={handleLimitList}
            onClickNext={handleNextPageList}
            onClickPrevious={handlePreviousPageList}
          />
        )}
      </div>

      {isLoadingIndicator && <LoadingIndicator />}

      {isOpenForm && (
        <Form
          title={userData.id ? 'Update User' : 'Add User'}
          primaryTitle={userData.id ? 'Update User' : 'Add User'}
          data={userData}
          isLoading={isLoadingForm}
          onCloseForm={handleCloseForm}
          onSubmitForm={userData.id ? handleUpdateUser : handleCreateUser}
          onChangeField={handleFieldChange}
          errorMessage={errorMessage}
        />
      )}

      {isOpenConfirmDelete && (
        <Confirm
          isLoading={isLoadingForm}
          onConfirm={handleConfirmDelete}
          onCloseConfirm={toggleConfirmDelete}
          title='Confirm Delete'
          message={CONFIRM_MESSAGE.CONFIRM_REMOVE}
        />
      )}

      {isOpenConfirmMultipleDelete && (
        <Confirm
          isLoading={isLoadingForm}
          onConfirm={handleDeleteMultiple}
          onCloseConfirm={toggleConfirmMultipleDelete}
          title='Confirm Multiple Delete User'
          message={CONFIRM_MESSAGE.CONFIRM_REMOVE}
        />
      )}

      {snackBarState.isOpen && (
        <SnackBar
          message={snackBarState.message}
          status={snackBarState.status}
          onCloseSnackBar={clearSnackBar}
        />
      )}
    </main>
  )
}

export default UserPage
