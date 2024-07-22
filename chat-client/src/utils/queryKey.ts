export const chatKeys = {
    all: ['chats'] as const,
    lists: () => [...chatKeys.all, 'list'] as const
};

export const usersKeys = {
    all: ['users'] as const,
    lists: () => [...usersKeys.all, 'list'] as const,
    list: (filters: string) => [...usersKeys.lists(), { filters }] as const,
    details: () => [...usersKeys.all, 'detail'] as const,
    detail: (id: number) => [...usersKeys.details(), id] as const,
    my: () => [...usersKeys.all, 'my'] as const
};

export const authKeys = {
    all: ['auth'] as const,
    existingId: (id: string) => [...authKeys.all, id]
};
