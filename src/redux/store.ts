import { autoBatchEnhancer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import user from './slices/user';
const preloadedState = {};

const rootReducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
  preloadedState,
  enhancers: (existingEnhancers: any) => {
    // Add the autobatch enhancer to the store setup
    return existingEnhancers.concat(autoBatchEnhancer());
  },
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
