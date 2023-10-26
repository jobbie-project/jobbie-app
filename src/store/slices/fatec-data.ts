import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FatecData} from '../interfaces/fatec-data.interface';

export const initialState: FatecData = {
  fatec_institutions: [],
  fatec_course: [],
};

export const fatecDataSlice = createSlice({
  name: 'fatecData',
  initialState: initialState,
  reducers: {
    setFatecInstitutions: (state, action: PayloadAction<{id: number; name: string}[]>) => {
      state.fatec_institutions = action.payload.map(institution => {
        return {
          value: `${institution.id}`,
          label: institution.name,
        };
      });
    },
    setFatecCourse: (state, action: PayloadAction<{id: number; name: string}[]>) => {
      state.fatec_course = action.payload.map(institution => {
        return {
          value: `${institution.id}`,
          label: institution.name,
        };
      });
    },
  },
});

export const {setFatecCourse, setFatecInstitutions} = fatecDataSlice.actions;

export default fatecDataSlice.reducer;
