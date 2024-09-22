import { Navbar } from '@/components';

interface SecondaryLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const SecondaryLayout = ({
  children,
  title = 'Add User',
}: SecondaryLayoutProps) => {
  return (
    <div>
      <h2 className="text-white text-xl font-semibold pl-10 pb-10">{title}</h2>
      <div className="w-full flex">
        <Navbar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-spaceBlue px-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryLayout;
