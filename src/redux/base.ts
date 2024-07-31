import _ from 'lodash';
import { ActionReducerMapBuilder, AnyAction, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import i18n from '@/i18n';

export type BaseStateStatusTypes = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BaseState {
  status: BaseStateStatusTypes;
  error: string | null;
}

export const defaultBaseState: BaseState = {
  status: 'idle',
  error: null,
};

export interface InjectHandlerV2Options {
  onSuccess?: (response: any) => Promise<void>;
  onError?: (response: any) => Promise<void>;
}

export async function injectHandlerV2(asyncFn: any, thunkAPI: any, options?: InjectHandlerV2Options) {
  try {
    const response = await asyncFn;
    if (_.has(response, 'status') && response.status !== 0) {
      throw response;
    }
    if (options?.onSuccess) {
      await options.onSuccess(response);
    }
    return response;
  } catch (error: any) {
    if (options?.onError) {
      await options.onError(error);
    }
    return thunkAPI.rejectWithValue(error);
  }
}

/**
 * @deprecated
 */
export async function injectHandler(asyncFn: any, thunkAPI: any, additional?: any) {
  try {
    const response = await asyncFn;
    const status = _.get(response, 'status');
    if (!!status && status !== 0) {
      return thunkAPI.rejectWithValue(response);
    }
    if (!_.isEmpty(additional)) {
      return {
        additional,
        ...response,
      };
    }
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
}

function pendingReducer(state: any) {
  state.error = null;
  state.status = 'loading';
}

function fulfilledReducer(state: any, action: AnyAction) {
  state.error = action?.payload?.message || i18n.t('thanhcong');
  state.status = 'succeeded';
}

function rejectedReducer(state: any, action: any) {
  state.status = 'failed';
  state.error = action?.payload?.message || i18n.t('coloixayravuilongthulai');
}

function _isPending(sliceName: string, action: any) {
  return isPending(action) && _.startsWith(action.type, sliceName);
}

function _isFulfilled(sliceName: string, action: any) {
  return isFulfilled(action) && _.startsWith(action.type, sliceName);
}

function _isRejected(sliceName: string, action: any) {
  return isRejected(action) && _.startsWith(action.type, sliceName);
}

export function setDefaultMatcherBuilder(sliceName: string, builder: ActionReducerMapBuilder<any>) {
  builder
    .addMatcher((action: AnyAction) => _isPending(sliceName, action), pendingReducer)
    .addMatcher((action: AnyAction) => _isFulfilled(sliceName, action), fulfilledReducer)
    .addMatcher((action: AnyAction) => _isRejected(sliceName, action), rejectedReducer);
}

export function setDefaultCaseBuilder(sliceName: string, builder: ActionReducerMapBuilder<any>) {
  builder.addDefaultCase((state: any, action: AnyAction) => {
    if (_isPending(sliceName, action)) {
      pendingReducer(state);
    } else if (_isFulfilled(sliceName, action)) {
      fulfilledReducer(state, action);
    } else if (_isRejected(sliceName, action)) {
      rejectedReducer(state, action);
    }
  });
}
