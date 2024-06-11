import { TQueryKey } from '@/types';

export const API_PATHS = {
  USERS: '/users',
  COMPANIES: '/companies',
  BRIGADES: '/brigades',
  CONTROL_TEAMS: '/controls',
  STAGE_COACHES: '/stagecoaches',
  CRCA: '/crca',
};

export const userLoginQueryKeys = {
  USER_LOGIN: 'userLogin',
};

export const userQueryKeys = {
  all: [{ scope: 'users' }] as const,
  lists: () => [{ ...userQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, filter }: TQueryKey) =>
    [
      {
        ...userQueryKeys.lists()[0],
        page,
        ...(filter && { filter }),
      },
    ] as const,
  details: () => [{ ...userQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...userQueryKeys.details()[0], id }] as const,
};

export const companyQueryKeys = {
  all: [{ scope: 'companies' }] as const,
  lists: () => [{ ...companyQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, filter }: TQueryKey) =>
    [
      {
        ...companyQueryKeys.lists()[0],
        page,
        filter,
      },
    ] as const,
  details: () => [{ ...companyQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...companyQueryKeys.details()[0], id }] as const,
};

export const brigadeQueryKeys = {
  all: [{ scope: 'brigades' }] as const,
  lists: () => [{ ...brigadeQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ filter }: { filter?: Record<string, string> }) =>
    [
      {
        ...brigadeQueryKeys.lists()[0],
        filter,
      },
    ] as const,
  details: () => [{ ...brigadeQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...brigadeQueryKeys.details()[0], id }] as const,
};

export const controlTeamsQueryKeys = {
  all: [{ scope: 'controlTeams' }] as const,
  lists: () => [{ ...controlTeamsQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ filter }: { filter?: Record<string, string> }) =>
    [
      {
        ...controlTeamsQueryKeys.lists()[0],
        filter,
      },
    ] as const,
  details: () =>
    [{ ...controlTeamsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...controlTeamsQueryKeys.details()[0], id }] as const,
};

export const stageCoachesQueryKeys = {
  all: [{ scope: 'stageCoaches' }] as const,
  lists: () => [{ ...stageCoachesQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ filter }: { filter?: Record<string, string> }) =>
    [
      {
        ...stageCoachesQueryKeys.lists()[0],
        filter,
      },
    ] as const,
  details: () =>
    [{ ...stageCoachesQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) =>
    [{ ...stageCoachesQueryKeys.details()[0], id }] as const,
};

export const crcaQueryKeys = {
  all: [{ scope: 'crca' }] as const,
  lists: () => [{ ...crcaQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ filter }: { filter?: Record<string, string> }) =>
    [
      {
        ...crcaQueryKeys.lists()[0],
        filter,
      },
    ] as const,
  details: () => [{ ...crcaQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...crcaQueryKeys.details()[0], id }] as const,
};
