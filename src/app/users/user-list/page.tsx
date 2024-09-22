import Link from 'next/link';
import { Metadata } from 'next';

// Components
import { Button, SearchBox } from '@/components';

// UI
import { UserTable, UserPagination, UserStatistics } from '@/ui/UserList';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants';
import { getUsers, getUserStatistics } from '@/actions';

export const metadata: Metadata = {
  title: 'UserList - Dark Dashboard',
  description:
    'The dashboard provides an overview of key metrics, recent activities, and quick access to important features and tools.',
};

interface ISearchParams {
  searchParams: {
    search: string;
    page: number;
    limit: number;
  };
}

const UserListPage = async ({
  searchParams: {
    search = '',
    page = DEFAULT_CURRENT_PAGE,
    limit = DEFAULT_PAGE_SIZE,
  },
}: ISearchParams) => {
  const [users, statistics] = await Promise.all([
    getUsers({ searchParams: { search, page, limit } }),
    getUserStatistics(),
  ]);

  const { total, new: newUsers, other, top } = statistics;

  return (
    <main>
      <div className="flex justify-between">
        <div className="flex gap-[50px] items-center">
          <h2 className="text-xl font-semibold text-white">Users</h2>

          <SearchBox />
        </div>

        <Link href="/users/personal-information">
          <Button
            title="Add User"
            size="sm"
            customClass="text-[10px] font-medium w-[137px] h-[30px] bg-primary"
          />
        </Link>
      </div>

      <UserStatistics total={total} new={newUsers} top={top} other={other} />

      <UserTable
        limit={limit}
        page={page}
        users={users.data || []}
        total={total}
      />

      <UserPagination searchParams={{ search, page, limit }} total={total} />
    </main>
  );
};

export default UserListPage;
