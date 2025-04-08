import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AccountSlice, createAccountSlice } from '@slices/index';

export const useBoundStore = create<AccountSlice, [['zustand/devtools', never]]>(
  devtools(
    (...a) => ({
      ...createAccountSlice(...a),
    }),
    { enabled: import.meta.env.DEV },
  ),
);
