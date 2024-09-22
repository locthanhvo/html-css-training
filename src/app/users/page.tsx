import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users - Dark Dashboard',
  description:
    'The dashboard provides an overview of key metrics, recent activities, and quick access to important features and tools.',
};

const UserPage = () => {
  return (
    <div className="w-[300px] pt-7 pl-7 text-white">
      <h1>User page</h1>
      <p>Coming soon!</p>
    </div>
  );
};

export default UserPage;
