import {Action, ThunkAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import profileDataSlice from './slices/profile-data';
import {useDispatch} from 'react-redux';
import jobDataSlice from './slices/job-data';

const reducers = combineReducers({
  profileData: profileDataSlice,
  jobData: jobDataSlice,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
