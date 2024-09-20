export const chatKeys = {
  all: ['chats'] as const,
  detail: (id: string) => [...chatKeys.details(), id] as const,
  details: () => [...chatKeys.all, 'detail'] as const,
  history: (id: string) => [...chatKeys.details(), 'history', id] as const,
  lists: () => [...chatKeys.all, 'list'] as const,
};

export const usersKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  my: () => [...usersKeys.all, 'my'] as const,
};

export const authKeys = {
  all: ['auth'] as const,
  existingId: (id: string) => [...authKeys.all, id],
};
