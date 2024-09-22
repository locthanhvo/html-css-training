import { getUser } from '@/actions';

// UI
import { Notification } from '@/ui/UserAdd';

const NotificationPage = async ({ params }: { params: { id: string } }) => {
  const personalInformation = await getUser(params.id);

  return <Notification initialValues={personalInformation.data} />;
};

export default NotificationPage;
