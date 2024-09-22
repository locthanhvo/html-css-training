import { getUser } from '@/actions';

// Components
import { BillForm } from '@/components/Form';

const BillingPage = async ({ params }: { params: { id: string } }) => {
  const personalInformation = await getUser(params.id);

  return <BillForm initialValues={personalInformation.data} />;
};

export default BillingPage;
