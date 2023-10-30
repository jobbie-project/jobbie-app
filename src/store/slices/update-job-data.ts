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

export const updateJobDataSlice = createSlice({
  name: 'updateJobData',
  initialState: initialState,
  reducers: {
    setUpdateJobData: (state, action: PayloadAction<JobData>) => {
      state.company_name = action.payload.company_name;
      state.owner_name = action.payload.owner_name;
      state.owner_email = action.payload.owner_email;
      state.position = action.payload.position;
      state.num_positions = action.payload.num_positions;
      state.salary = action.payload.salary;
      state.location = action.payload.location;
      state.description = action.payload.description;
      state.type = action.payload.type;
      state.job_time = action.payload.job_time;
      state.contract_type = action.payload.contract_type;
    },
    setUpdateJobCompanyName: (state, action: PayloadAction<string>) => {
      state.company_name = action.payload;
    },
    setUpdateJobOwner: (state, action: PayloadAction<string>) => {
      state.owner_name = action.payload;
    },
    setUpdateJobOwnerEmail: (state, action: PayloadAction<string>) => {
      state.owner_email = action.payload;
    },
    setUpdateJobPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setUpdateJobSalary: (state, action: PayloadAction<string>) => {
      state.salary = action.payload;
    },

    setUpdateJobNumPositions: (state, action: PayloadAction<string>) => {
      state.num_positions = action.payload;
    },
    setUpdateJobLocation: (state, action: PayloadAction<{city: string; state: string}>) => {
      state.location = action.payload;
    },
    setUpdateJobDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setUpdateJobType: (state, action: PayloadAction<JobType>) => {
      state.type = action.payload;
    },
    setUpdateJobTime: (state, action: PayloadAction<JobTime>) => {
      state.job_time = action.payload;
    },
    setUpdateJobContractType: (state, action: PayloadAction<ContractType>) => {
      state.contract_type = action.payload;
    },
  },
});

export const {
  setUpdateJobData,
  setUpdateJobCompanyName,
  setUpdateJobOwner,
  setUpdateJobOwnerEmail,
  setUpdateJobPosition,
  setUpdateJobSalary,
  setUpdateJobNumPositions,
  setUpdateJobLocation,
  setUpdateJobDescription,
  setUpdateJobType,
  setUpdateJobTime,
  setUpdateJobContractType,
} = updateJobDataSlice.actions;

export default updateJobDataSlice.reducer;
