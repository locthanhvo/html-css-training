import { getUser } from '@/actions';

// Components
import { PersonalForm } from '@/components/Form';

const PersonalInformationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const personalInformation = await getUser(params.id);

  return <PersonalForm initialValues={personalInformation.data} />;
};

export default PersonalInformationPage;
