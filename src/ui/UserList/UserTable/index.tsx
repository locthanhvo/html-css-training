'use client';

import { MouseEvent, Suspense, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

// Components
import { Modal, Status } from '@/components';

// Types
import { IUserModel, TDataSource } from '@/types';

// Icons
import {
  BinIcon,
  CheckboxIcon,
  LocationIcon,
  LockBoxIcon,
  PencilIcon,
  PersonIcon,
  PhoneIcon,
} from '@/icons';
import CartItem from '@/components/CardItem';

// Skeleton
import { TableUserSkeleton } from '@/ui/UserList/Skeleton';

// Actions
import { deleteUser } from '@/actions';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import Link from 'next/link';

const Table = dynamic(() => import('@/ui/UserList/Table'));
const ConfirmModal = dynamic(() => import('@/ui/UserList/ConfirmModal'));

interface TUserTableProps {
  page: number;
  limit: number;
  users: TDataSource[];
  total: number;
}

const UserTable = ({ limit, page, users, total }: TUserTableProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const actionItem = useRef<IUserModel | null>(null);

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };

  const handleClickDeleteButton = (e?: MouseEvent<HTMLElement>) => {
    const target = e?.currentTarget as HTMLElement;
    const { id, email } = target.dataset;

    actionItem.current = { id, email } as IUserModel;
    handleOpenDeleteModal();
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await deleteUser(actionItem.current?.id as string);

      toast.success(SUCCESS_MESSAGES.DELETE_USER);
    } catch (error) {
      toast.error(ERROR_MESSAGES.DELETE_USER);
    }

    setIsDeleteLoading(false);
    handleOpenDeleteModal();
  };

  const renderColumns = [
    {
      title: 'Name',
      key: 'name',
      icon: <PersonIcon width={10} height={10} />,
      isSort: true,
      renderBody: ({ name, email, avatar }: TDataSource) => (
        <CartItem
          name={name as string}
          email={email as string}
          src={avatar as string}
        />
      ),
    },
    {
      title: 'Phone',
      key: 'phone',
      icon: <PhoneIcon />,
      isSort: true,
    },
    {
      title: 'Location',
      key: 'location',
      icon: <LocationIcon />,
      isSort: true,
    },
    {
      title: 'Company',
      key: 'company',
      icon: <LockBoxIcon />,
      isSort: true,
    },
    {
      title: 'Status',
      key: 'status',
      icon: <CheckboxIcon />,
      isSort: true,
      renderBody: ({ status }: TDataSource) => (
        <Status type={status as 'online' | 'offline'} />
      ),
    },
    {
      title: '',
      key: 'action',
      renderBody: ({ id, email }: TDataSource) => (
        <div className="flex  gap-2">
          <Link href={`${id}/personal-information`}>
            <button className="p-1" title="button-edit">
              <PencilIcon />
            </button>
          </Link>

          <button
            title="button-delete"
            className="p-1"
            data-id={id}
            data-email={email}
            onClick={handleClickDeleteButton}
          >
            <BinIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <Suspense fallback={<TableUserSkeleton />}>
        <Table
          columns={renderColumns}
          currentPage={page}
          dataSource={users || []}
          pageSize={limit}
          total={total}
        />
      </Suspense>

      {isOpenDeleteModal && (
        <Modal
          isOpen={isOpenDeleteModal}
          onClose={handleOpenDeleteModal}
          body={
            <ConfirmModal
              title="Are you sure you want to delete this user?"
              itemName={actionItem.current?.email}
              isDisabled={isDeleteLoading}
              onConfirm={handleConfirmDelete}
              onCloseModal={handleOpenDeleteModal}
            />
          }
        />
      )}
    </div>
  );
};

export default UserTable;
