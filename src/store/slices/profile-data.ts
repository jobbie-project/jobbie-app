import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ProfileAddress,
  ProfileData,
  ProfileEducation,
  ProfileFatecEducation,
  ProfileLinks,
  ProfilePreviousExperience,
} from '../interfaces/profile-data-interface';
import {StudentShift} from '@/enums';

const initialState: ProfileData = {
  name: '',
  phone: '',
  address: {} as ProfileAddress,
  education: [] as ProfileEducation[],
  fatec_education: {} as ProfileFatecEducation,
  previous_experience: [] as ProfilePreviousExperience[],
  tech_stacks: [],
  certifications: [],
  links: {} as ProfileLinks,
  shift: '' as StudentShift,
};

export const profileDataSlice = createSlice({
  name: 'profileData',
  initialState: initialState,
  reducers: {
    setUserAddress: (state, action: PayloadAction<ProfileAddress>) => {
      state.address = action.payload;
    },
    setUserFatecEducation: (state, action: PayloadAction<ProfileFatecEducation>) => {
      state.fatec_education = action.payload;
    },
    setUserEducation: (state, action: PayloadAction<ProfileEducation>) => {
      state.education.push(action.payload);
    },
    updateUserEducation: (state, action: PayloadAction<{index: number; education: ProfileEducation}>) => {
      state.education[action.payload.index] = action.payload.education;
    },
    deleteUserEducation: (state, action: PayloadAction<{index: number}>) => {
      state.education.splice(action.payload.index, 1);
    },
    setUserShift: (state, action: PayloadAction<StudentShift>) => {
      state.shift = action.payload;
    },
    setUserPreviousExperience: (state, action: PayloadAction<ProfilePreviousExperience>) => {
      state.previous_experience.push(action.payload);
    },
    eraseUserPreviousExperience: state => {
      state.previous_experience = [];
    },
    updateUserPreviousExperience: (
      state,
      action: PayloadAction<{index: number; previousExperience: ProfilePreviousExperience}>,
    ) => {
      state.previous_experience[action.payload.index] = action.payload.previousExperience;
    },
    deleteUserPreviousExperience: (state, action: PayloadAction<{index: number}>) => {
      state.previous_experience.splice(action.payload.index, 1);
    },

    setUserLinks: (state, action: PayloadAction<ProfileLinks>) => {
      state.links = {...state.links, ...action.payload};
    },

    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    setUserTechStacks: (state, action: PayloadAction<string>) => {
      state.tech_stacks.push(action.payload);
    },
    deleteUserTechStacks: (state, action: PayloadAction<{index: number}>) => {
      state.tech_stacks.splice(action.payload.index, 1);
    },

    setUserCertifications: (state, action: PayloadAction<string>) => {
      state.certifications.push(action.payload);
    },
    deleteUserCertifications: (state, action: PayloadAction<{index: number}>) => {
      state.certifications.splice(action.payload.index, 1);
    },
  },
});

export const {
  setUserAddress,
  setUserEducation,
  setUserFatecEducation,
  updateUserEducation,
  deleteUserEducation,
  setUserPreviousExperience,
  updateUserPreviousExperience,
  deleteUserPreviousExperience,
  setUserLinks,
  setUserName,
  setUserPhone,
  setUserTechStacks,
  deleteUserTechStacks,
  setUserCertifications,
  setUserShift,
  deleteUserCertifications,
  eraseUserPreviousExperience,
} = profileDataSlice.actions;

export default profileDataSlice.reducer;
