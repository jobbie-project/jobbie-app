import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {JobData} from '../interfaces/job-data-interface';

const initialState: JobData = {
  company_name: '',
  owner: '',
  owner_email: '',
  position: '',
  num_positions: 0,
  salary: '',
  location: {
    city: '',
    state: '',
  },
  description: '',
  type: '',
  time: '',
  date: new Date(),
};

export const jobDataSlice = createSlice({
  name: 'jobData',
  initialState: initialState,
  reducers: {
    setJobData: (state, action: PayloadAction<JobData>) => {
      state = action.payload;
    },
    setJobCompanyName: (state, action: PayloadAction<string>) => {
      state.company_name = action.payload;
    },
    setJobOwner: (state, action: PayloadAction<string>) => {
      state.owner = action.payload;
    },
    setJobOwnerEmail: (state, action: PayloadAction<string>) => {
      state.owner_email = action.payload;
    },
    setJobPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setJobSalary: (state, action: PayloadAction<string>) => {
      state.salary = action.payload;
    },

    setJobNumPositions: (state, action: PayloadAction<number>) => {
      state.num_positions = action.payload;
    },
    setJobLocation: (state, action: PayloadAction<{city: string; state: string}>) => {
      state.location = action.payload;
    },
    setJobDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setJobType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setJobTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setJobDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
});

export const {
  setJobData,
  setJobCompanyName,
  setJobOwner,
  setJobOwnerEmail,
  setJobPosition,
  setJobNumPositions,
  setJobSalary,
  setJobLocation,
  setJobDescription,
  setJobType,
  setJobTime,
  setJobDate,
} = jobDataSlice.actions;

export default jobDataSlice.reducer;
