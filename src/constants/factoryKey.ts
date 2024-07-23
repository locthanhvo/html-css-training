export const boardQueryKeys = {
  all: [{ scope: 'boards' }],
  lists: () => [{ ...boardQueryKeys.all[0], entity: 'list' }] as const,
};

export const taskQueryKeys = {
  all: [{ scope: 'tasks' }],
  lists: () => [{ ...taskQueryKeys.all[0], entity: 'list' }] as const,
  details: () => [{ ...taskQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id: string) => [{ ...taskQueryKeys.details()[0], id }] as const,
};
