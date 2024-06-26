import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {JobData} from '../interfaces/job-data-interface';
import {ContractType, JobTime, JobType} from '@/enums';

const initialState: JobData = {
  company_name: '',
  owner_name: '',
  owner_email: '',
  position: '',
  num_positions: '',
  salary: '',
  location: {
    city: '',
    state: '',
  },
  description: '',
  type: undefined,
  job_time: '' as JobTime,
  contract_type: '' as ContractType,
  job_tag: '',
  has_sorting: false,
};

export const jobDataSlice = createSlice({
  name: 'jobData',
  initialState: initialState,
  reducers: {
    setJobCompanyName: (state, action: PayloadAction<string>) => {
      state.company_name = action.payload;
    },
    setJobOwner: (state, action: PayloadAction<string>) => {
      state.owner_name = action.payload;
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

    setJobNumPositions: (state, action: PayloadAction<string>) => {
      state.num_positions = action.payload;
    },
    setJobLocation: (state, action: PayloadAction<{city: string; state: string}>) => {
      state.location = action.payload;
    },
    setJobDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setJobType: (state, action: PayloadAction<JobType>) => {
      state.type = action.payload;
    },
    setJobTime: (state, action: PayloadAction<JobTime>) => {
      state.job_time = action.payload;
    },
    setJobContractType: (state, action: PayloadAction<ContractType>) => {
      state.contract_type = action.payload;
    },
    setJobTag: (state, action: PayloadAction<string>) => {
      state.job_tag = action.payload;
    },
  },
});

export const {
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
  setJobContractType,
  setJobTag,
} = jobDataSlice.actions;

export default jobDataSlice.reducer;
