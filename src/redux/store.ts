import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';

import user from './slices/user';
import persistReducer from 'redux-persist/es/persistReducer';
const preloadedState = {};

const userPersistedReducer = persistReducer(
  {
    key: 'user',
    storage: localForage.createInstance({
      name: 'user',
      driver: localForage.INDEXEDDB,
    }),
  },
  user,
);

const rootReducer = combineReducers({
  user: userPersistedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
  preloadedState,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
