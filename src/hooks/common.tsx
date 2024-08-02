import _ from 'lodash';
import type { AppDispatch, RootState } from '@redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = (fn) => useSelector(fn, _.isEqual);
