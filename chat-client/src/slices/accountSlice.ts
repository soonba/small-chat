import { StateCreator } from 'zustand';

export interface AccountState {
  nickname?: string;
  accountId?: string;
}

export interface AccountSlice extends AccountState {
  initAccount: () => void;
  setAccount: (payload: AccountState) => void;
}

const initialState: AccountState = {
  accountId: '',
  nickname: '',
};

export const createAccountSlice: StateCreator<AccountState, [['zustand/devtools', never]], [], AccountState> = (
  set,
) => ({
  initialState,
  initAccount: () => set(() => ({ ...initialState }), undefined, 'account/initAccount'),
  setAccount: (payload: AccountState) => set((state) => ({ ...state, ...payload }), undefined, 'account/setAccount'),
});
