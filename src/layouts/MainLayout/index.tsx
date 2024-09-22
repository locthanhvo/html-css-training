import { Sidebar } from '@/components';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-full min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-spaceBlue p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
