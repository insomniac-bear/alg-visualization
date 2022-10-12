import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { rootReducer } from './slices';
import { rootSaga } from './sagas/saga'

const sagaMiddleware = createSagaMiddleware();

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const store = setupStore();

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
