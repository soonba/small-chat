import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface Account {
    accountId?: string;
    nickname?: string;
}

const initialState: Account = {
    accountId: '',
    nickname: ''
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, { payload }: PayloadAction<Account>) => {
            return { ...state, ...payload };
        },
        initAccount: () => initialState
    }
});

export const { setAccount, initAccount } = accountSlice.actions;

export default accountSlice.reducer;
