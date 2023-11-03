import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JobFilters} from '../interfaces/job-filters.interface';
import {ContractType, JobType} from '@/enums';

const initialState: JobFilters = {
  searchTerm: '',
  contractType: [],
  jobType: [],
  page: 1,
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
    },
    clearFilters: state => {
      state.searchTerm = initialState.searchTerm;
      state.contractType = initialState.contractType;
      state.jobType = initialState.jobType;
    },
    clearSearchTerm: state => {
      state.searchTerm = initialState.searchTerm;
    },
    setContractType: (state, action: PayloadAction<ContractType[]>) => {
      state.contractType = action.payload;
    },
    setJobType: (state, action: PayloadAction<JobType[]>) => {
      state.jobType = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {setJobFilters, setSearchTerm, clearFilters, clearSearchTerm, setContractType, setJobType} =
  jobFiltersSlice.actions;

export default jobFiltersSlice.reducer;
