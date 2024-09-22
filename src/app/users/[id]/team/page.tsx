import { getUser } from '@/actions';

// Components
import { TeamForm } from '@/components/Form';

const TeamPage = async ({ params }: { params: { id: string } }) => {
  const personalInformation = await getUser(params.id);

  return <TeamForm initialValues={personalInformation.data} />;
};

export default TeamPage;
