import {
  LIMIT_DEFAULT,
  MAX_RETRIES,
  ORDER_DESC,
  PAGE_DEFAULT,
  SNACKBAR_MESSAGE,
  SORT_DEFAULT,
  STATUS,
} from "@constants";
import { addUser, deleteUser, getUser, updateUser } from "@services";
import { type User, type UserQueryParamsType, type UserRequest } from "@types";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
} from "react";

interface ProviderProps {
  children: ReactNode;
}
interface UsersContextData {
  handleAddUser: (data: UserRequest) => Promise<void>;
  resetUserData: () => void;
  updateChangeField: (field: Record<string, string>) => void;
  handleSearchUser: (keyword: string) => void;
  handleFilterStatus: (option: string) => void;
  handleLimitUser: (limit: number) => Promise<User[]>;
  handlePaginationPage: (page: number) => Promise<User[]>;
  handleDeleteUser: (id: string) => Promise<void>;
  handleDetailUser: (id: string) => Promise<User>;
  handleEditUser: (id: string, data: UserRequest) => Promise<void>;
  handleDeleteMultipleUser: (ids: string[]) => Promise<void>;
  getData: (queryParams: UserQueryParamsType) => Promise<void>;
  setUserData: Dispatch<SetStateAction<User>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
  users: User[];
  initialState: User;
  userData: User;
  query: UserQueryParamsType;
}

const query = {
  page: PAGE_DEFAULT,
  limit: LIMIT_DEFAULT,
  sortBy: SORT_DEFAULT,
  order: ORDER_DESC,
  firstName: "",
  email: "",
};

const initUserState: User = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  confirmPassword: "",
  email: "",
  phone: "",
  password: "",
  status: STATUS.OFFLINE,
  avatar: "",
  createdAt: "",
};

export const UsersContext = createContext<UsersContextData>(
  {} as UsersContextData,
);

export const useUser = (): UsersContextData => useContext(UsersContext);

export const UserProvider = ({ children }: ProviderProps): JSX.Element => {
  const [userData, setUserData] = useState<User>(initUserState);
  const [users, setUsers] = useState<User[]>([]);
  const initUserList = useRef<User[]>([]);

  const getData = async (queryParams: UserQueryParamsType): Promise<void> => {
    const userList = (await getUser("", queryParams)) as User[];
    initUserList.current = userList;

    setUsers(userList);
  };

  const getUsersByEmail = async (
    query: UserQueryParamsType,
  ): Promise<User[]> => {
    return (await getUser("", query)) as User[];
  };

  const handleAddUser = async (data: UserRequest): Promise<void> => {
    const newUser = {
      ...data,
      createdAt: new Date().toISOString(),
      email: data.email.toLowerCase(),
    };

    const [userExist] = await getUsersByEmail({
      ...query,
      email: newUser.email,
    });

    if (userExist) throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED);

    await addUser<UserRequest, User>(newUser);
    await getData(query);
  };

  const handleSearchUser = (keyword: string): void => {
    const lowerCaseKeyword = keyword.trim().toLowerCase();

    setUsers(
      lowerCaseKeyword === ""
        ? initUserList.current
        : initUserList.current.filter(
            (data) =>
              data.firstName.toLowerCase().includes(lowerCaseKeyword) ||
              data.email.toLowerCase().includes(lowerCaseKeyword),
          ),
    );
  };

  const handleFilterStatus = (status: string): void => {
    if (status.trim() === "") {
      setUsers(initUserList.current);
      return;
    }

    const filterStatus = initUserList.current.filter((data) => {
      return data.status.includes(status);
    });

    setUsers(filterStatus);
  };

  const handleLimitUser = async (limit: number): Promise<User[]> => {
    query.limit = limit;
    query.page = PAGE_DEFAULT;

    const users = (await getUser("", query)) as User[];
    initUserList.current = users;

    setUsers(users);

    return users;
  };

  const handlePaginationPage = async (page: number): Promise<User[]> => {
    query.page = page;
    const users = (await getUser("", query)) as User[];
    initUserList.current = users;

    setUsers(users);

    return users;
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    await deleteUser(id);
    await getData(query);
  };

  const handleDeleteMultipleUser = async (
    ids: string[],
    maxRetries = MAX_RETRIES,
  ): Promise<void> => {
    const processQueue = async (): Promise<void> => {
      for (const id of ids) {
        let success = false;
        let retries = 0;

        while (!success && retries < maxRetries) {
          try {
            await deleteUser(id);

            success = true;
          } catch (error) {
            retries++;

            await sleep(Math.pow(2, retries) * 1000);
          }
        }
      }

      await getData(query);
    };

    await processQueue();
  };

  const sleep = async (ms: number): Promise<unknown> =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  const handleEditUser = useCallback(
    async (id: string, data: UserRequest): Promise<void> => {
      const [userExist] = await getUsersByEmail({
        ...query,
        email: data.email,
      });

      if (userExist && userExist.id !== id)
        throw new Error(SNACKBAR_MESSAGE.EMAIL_FAILED);

      await updateUser<UserRequest, User>(id, data);
      await getData(query);
    },
    [getData],
  );

  const handleDetailUser = async (id: string): Promise<User> => {
    return (await getUser(id, {} as UserQueryParamsType)) as User;
  };

  const resetUserData = () => {
    setUserData(initUserState);
  };

  const updateChangeField = (field: Record<string, string>) => {
    setUserData((prevFormData) => ({ ...prevFormData, ...field }));
  };

  const valueContext = {
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
  };

  return (
    <UsersContext.Provider value={valueContext}>
      {children}
    </UsersContext.Provider>
  );
};
