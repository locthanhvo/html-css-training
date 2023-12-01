import {
  LIMIT_DEFAULT,
  MAX_RETRIES,
  ORDER_DESC,
  PAGE_DEFAULT,
  SNACKBAR_MESSAGE,
  SORT_DEFAULT,
  STATUS,
} from '@constants'
import { addUser, deleteUser, getUser, updateUser } from '@services'
import { User, UserQueryParamsType, UserRequest } from '@types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface ProviderProps {
  children: ReactNode
}
interface UsersContextData {
  handleAddUser: (data: UserRequest) => Promise<void>
  resetUserData: () => void
  updateChangeField: (field: Record<string, string>) => void
  handleSearchUser: (keyword: string) => void
  handleFilterStatus: (option: string) => void
  handleLimitUser: (limit: number) => Promise<User[]>
  handlePaginationPage: (page: number) => Promise<User[]>
  handleDeleteUser: (id: string) => Promise<void>
  handleDetailUser: (id: string) => Promise<User>
  handleEditUser: (id: string, data: UserRequest) => Promise<void>
  handleDeleteMultipleUser: (ids: string[]) => Promise<void>
  getData: (queryParams: UserQueryParamsType) => Promise<void>
  setUserData: Dispatch<SetStateAction<User>>
  setUsers: Dispatch<SetStateAction<User[]>>
  users: User[]
  initialState: User
  userData: User
  query: UserQueryParamsType
}

let query = {
  page: PAGE_DEFAULT,
  limit: LIMIT_DEFAULT,
  sortBy: SORT_DEFAULT,
  order: ORDER_DESC,
  firstName: '',
  email: '',
}

const initUserState: User = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  confirmPassword: '',
  email: '',
  phone: '',
  password: '',
  status: STATUS.OFFLINE,
  avatar: '',
  createdAt: '',
}

let initUserList: User[] = []

export const UsersContext = createContext<UsersContextData>({} as UsersContextData)

export const useUser = (): UsersContextData => useContext(UsersContext)

export const UserProvider = ({ children }: ProviderProps) => {
  const [userData, setUserData] = useState<User>(initUserState)
  const [users, setUsers] = useState<User[]>([])

  const getData = useCallback(async (queryParams: UserQueryParamsType): Promise<void> => {
    try {
      const userList = (await getUser('', queryParams)) as User[]
      initUserList = userList

      setUsers(userList)
    } catch (error) {
      throw error
    }
  }, [])

  const getUsersByEmail = async (query: UserQueryParamsType): Promise<User[]> => {
    return (await getUser('', query)) as User[]
  }

  const handleAddUser = useCallback(
    async (data: UserRequest): Promise<void> => {
      try {
        const newUser = {
          ...data,
          createdAt: new Date().toISOString(),
          email: data.email.toLowerCase(),
        }

        const [userExist] = await getUsersByEmail({
          ...query,
          email: newUser.email,
        })

        if (userExist) throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED)

        await addUser<UserRequest, User>(newUser)
        await getData(query)
      } catch (error) {
        throw error
      }
    },
    [getData],
  )

  const handleSearchUser = useCallback(
    (keyword: string): void => {
      const lowerCaseKeyword = keyword.trim().toLowerCase()

      setUsers(
        lowerCaseKeyword === ''
          ? initUserList
          : initUserList.filter(
              (data) =>
                data.firstName.toLowerCase().includes(lowerCaseKeyword) ||
                data.email.toLowerCase().includes(lowerCaseKeyword),
            ),
      )
    },
    [initUserList, setUsers],
  )

  const handleFilterStatus = useCallback(
    (status: string): void => {
      if (status.trim() === '') {
        return setUsers(initUserList)
      }

      const filterStatus = initUserList.filter((data) => {
        return data.status.includes(status)
      })

      setUsers(filterStatus)
    },
    [initUserList, setUsers],
  )

  const handleLimitUser = useCallback(async (limit: number): Promise<User[]> => {
    try {
      query.limit = limit
      query.page = PAGE_DEFAULT

      const users = (await getUser('', query)) as User[]
      initUserList = users

      setUsers(users)

      return users
    } catch (error) {
      throw error
    }
  }, [])

  const handlePaginationPage = useCallback(async (page: number): Promise<User[]> => {
    try {
      query.page = page
      const users = (await getUser('', query)) as User[]
      initUserList = users

      setUsers(users)

      return users
    } catch (error) {
      throw error
    }
  }, [])

  const handleDeleteUser = useCallback(
    async (id: string): Promise<void> => {
      try {
        await deleteUser(id)
        await getData(query)
      } catch (error) {
        throw error
      }
    },
    [getData, query],
  )

  const handleDeleteMultipleUser = useCallback(
    async (ids: string[], maxRetries = MAX_RETRIES): Promise<void> => {
      try {
        const processQueue = async () => {
          for (const id of ids) {
            let success = false
            let retries = 0

            while (!success && retries < maxRetries) {
              try {
                await deleteUser(id)

                success = true
              } catch (error) {
                retries++

                await sleep(Math.pow(2, retries) * 1000)
              }
            }
          }

          await getData(query)
        }

        await processQueue()
      } catch (error) {
        throw error
      }
    },
    [getData, query],
  )

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleEditUser = useCallback(
    async (id: string, data: UserRequest): Promise<void> => {
      try {
        const [userExist] = await getUsersByEmail({
          ...query,
          email: data.email,
        })

        if (userExist && userExist.id !== id) throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED)

        await updateUser<UserRequest, User>(id, data)
        await getData(query)
      } catch (error) {
        throw error
      }
    },
    [getData],
  )

  const handleDetailUser = useCallback(async (id: string): Promise<User> => {
    try {
      return (await getUser(id, {} as UserQueryParamsType)) as User
    } catch (error) {
      throw error
    }
  }, [])

  const resetUserData = useCallback(() => {
    setUserData(initUserState)
  }, [])

  const updateChangeField = useCallback((field: Record<string, string>) => {
    setUserData((prevFormData) => ({ ...prevFormData, ...field }))
  }, [])

  const valueContext = useMemo(
    () => ({
      handleAddUser,
      resetUserData,
      updateChangeField,
      handleSearchUser,
      handleFilterStatus,
      handleLimitUser,
      handlePaginationPage,
      handleDeleteUser,
      handleDetailUser,
      handleEditUser,
      handleDeleteMultipleUser,
      setUsers,
      getData,
      setUserData,
      initialState: initUserState,
      userData,
      users,
      query,
    }),
    [
      handleAddUser,
      resetUserData,
      updateChangeField,
      handleSearchUser,
      handleFilterStatus,
      handleLimitUser,
      handlePaginationPage,
      handleDeleteUser,
      handleDetailUser,
      handleEditUser,
      handleDeleteMultipleUser,
      setUserData,
      getData,
      userData,
      users,
      query,
    ],
  )

  return <UsersContext.Provider value={valueContext}>{children}</UsersContext.Provider>
}
