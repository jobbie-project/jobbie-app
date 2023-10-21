import {Action, ThunkAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import profileDataSlice from './slices/profile-data';
import {useDispatch} from 'react-redux';
import jobDataSlice from './slices/job-data';
import updateJobData from './slices/update-job-data';
import updateProfileDataSlice from './slices/update-profile-data';

const reducers = combineReducers({
  profileData: profileDataSlice,
  updateProfileData: updateProfileDataSlice,
  jobData: jobDataSlice,
  updateJobData: updateJobData,
});

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
