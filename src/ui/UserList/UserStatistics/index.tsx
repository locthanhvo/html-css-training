import { Suspense } from 'react';

// Mocks
import { MOCK_USERS_SUMMARY } from '@/__mock__';

// Components
import { CardSummary } from '@/components';

// Skeleton
import { CardSummarySkeleton } from '@/ui/UserList/Skeleton';

interface IUserStatisticsProps {
  total: number;
  new: number;
  top: number;
  other: number;
}

const UserStatistics = ({
  total,
  new: newUsers,
  top,
  other,
}: IUserStatisticsProps) => {
  return (
    <div className="flex gap-8 w-full mt-[50px]">
      {MOCK_USERS_SUMMARY(total, newUsers, top, other).map(
        ({ id, title, total, icon: Icon }) => (
          <Suspense key={id} fallback={<CardSummarySkeleton />}>
            <CardSummary title={title} total={total} icon={<Icon />} />
          </Suspense>
        ),
      )}
    </div>
  );
};

export default UserStatistics;
