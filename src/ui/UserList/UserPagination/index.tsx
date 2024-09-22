// Components
import Pagination from '@/ui/UserList/Pagination';

interface TUserPaginationProps {
  total: number;
  searchParams: {
    search: string;
    page: number;
    limit: number;
  };
}

const UserPagination = ({ searchParams, total }: TUserPaginationProps) => {
  return (
    <div className="mt-6">
      <Pagination
        total={total}
        pageSize={searchParams.limit}
        currentPage={searchParams.page}
      />
    </div>
  );
};

export default UserPagination;
