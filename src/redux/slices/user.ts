import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseState, injectHandler, setDefaultMatcherBuilder } from '../base';

import userService from '@services/user.service';

interface UserState extends BaseState {
  user: any | null;
}

const initialState = {
  error: null,
} as UserState;

const storeName = 'user';

const userSlice = createSlice({
  name: storeName,
  initialState,
  reducers: {
    resetUserInfo: () => {
      return initialState;
    },
    setUserInfo(state, action) {
      state.user = action.payload;
    },
    // Action to clear user information
    clearUserInfo(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    setDefaultMatcherBuilder(storeName, builder);
  },
});

export const getUserInfo = createAsyncThunk('user/getInfo', async (id: string, thunkAPI: any) => {
  return injectHandler(userService.getUserInfo(id), thunkAPI);
});

const { reducer, actions } = userSlice;
export const { resetUserInfo, setUserInfo, clearUserInfo } = actions;
export default reducer;
