import { ArrowIcon, ArrowRightIcon, GlassesIcon, LogoIcon } from '@/icons';

import { SIDEBAR_MENU, SIDEBAR_MENU_SECOND } from '@/constants';

import { Input, Menu, Avatar, Button } from '@/components';

import AvatarUser from '@/images/avatars/avatar-user.webp';

interface SidebarProps {
  onChange?: (value: string) => void;
}

const Sidebar = ({ onChange }: SidebarProps) => {
  return (
    <div className="bg-spaceBlue max-w-[300px] min-h-screen border-r border-r-secondary/15 shadow-2xl">
      <div className="px-7 pt-[38px] pb-7">
        <div className="flex justify-between items-center  ">
          <div className="flex gap-2">
            <LogoIcon />
            <h1 className="text-xl text-white font-semibold">Dashdark X</h1>
          </div>

          <div className="flex">
            <ArrowIcon />
            <ArrowIcon rotate="180deg" />
          </div>
        </div>

        <div className="w-full mt-10">
          <Input
            customClass="w-full"
            leftIcon={<GlassesIcon />}
            placeholder="Search for..."
            onChange={onChange}
          />
        </div>
      </div>

      <div className="px-7 border-b border-white/30">
        {SIDEBAR_MENU.map(
          ({ name, path, paths, leftIcon: LeftIcon, isRightIcon }) => (
            <Menu
              path={path}
              key={name}
              name={name}
              leftIcon={<LeftIcon />}
              isRightIcon={isRightIcon}
              paths={paths}
            />
          ),
        )}
      </div>

      <div className="px-7">
        {SIDEBAR_MENU_SECOND.map(
          ({ name, path, leftIcon: LeftIcon, isRightIcon }) => (
            <Menu
              key={name}
              path={path}
              name={name}
              leftIcon={<LeftIcon />}
              isRightIcon={isRightIcon}
            />
          ),
        )}

        <div className="flex justify-between p-4 items-end">
          <div className="flex items-center gap-2">
            <Avatar src={AvatarUser} />
            <div className="flex flex-col">
              <p className="font-medium text-white text-sm">John Carter</p>
              <span className="text-secondary font-medium text-xs">
                Account settings
              </span>
            </div>
          </div>

          <ArrowIcon rotate="180deg" />
        </div>

        <div className="p-4 mt-16 ">
          <Button
            title="Get template"
            endIcon={<ArrowRightIcon />}
            size="md"
            customClass="w-full flex items-center justify-center px-3 py-[14px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
