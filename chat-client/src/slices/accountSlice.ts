import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  accountId?: string;
  nickname?: string;
}

const initialState: Account = {
  accountId: '',
  nickname: '',
};

export const accountSlice = createSlice({
  initialState,
  name: 'account',
  reducers: {
    initAccount: () => initialState,
    setAccount: (state, { payload }: PayloadAction<Account>) => {
      return { ...state, ...payload };
    },
  },
});

export const { initAccount, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
