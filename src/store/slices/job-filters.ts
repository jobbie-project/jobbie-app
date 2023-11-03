import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JobFilters} from '../interfaces/job-filters.interface';
import {ContractType, JobType} from '@/enums';

const initialState: JobFilters = {
  searchTerm: '',
  contractType: [],
  jobType: [],
  page: 1,
  code: '',
  studentName: '',
};

export const jobFiltersSlice = createSlice({
  name: 'jobFilters',
  initialState: initialState,
  reducers: {
    setJobFilters: (state, action: PayloadAction<JobFilters>) => {
      state = {...state, ...action.payload};
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    clearFilters: state => {
      state.searchTerm = initialState.searchTerm;
      state.contractType = initialState.contractType;
      state.jobType = initialState.jobType;
      state.page = initialState.page;
      state.code = initialState.code;
      state.studentName = initialState.studentName;
    },
    clearSearchTerm: state => {
      state.searchTerm = initialState.searchTerm;
      state.page = 1;
    },
    setContractType: (state, action: PayloadAction<ContractType[]>) => {
      state.contractType = action.payload;
    },
    setJobType: (state, action: PayloadAction<JobType[]>) => {
      state.jobType = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = 1;
      state.page = action.payload;
    },
    setStudentName: (state, action: PayloadAction<string>) => {
      state.studentName = action.payload;
    },
    setJobCode: (state, action: PayloadAction<string>) => {
      state.page = 1;
      state.code = action.payload;
    },
  },
});

export const {
  setJobFilters,
  setSearchTerm,
  clearFilters,
  clearSearchTerm,
  setContractType,
  setJobType,
  setStudentName,
  setPage,
  setJobCode,
} = jobFiltersSlice.actions;

export default jobFiltersSlice.reducer;
