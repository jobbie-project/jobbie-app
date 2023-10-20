import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ProfileAddress,
  ProfileData,
  ProfileEducation,
  ProfileFatecEducation,
  ProfileLinks,
  ProfilePreviousExperience,
} from '../interfaces/profile-data-interface';

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
};

export const updateProfileDataSlice = createSlice({
  name: 'updateProfileData',
  initialState: initialState,
  reducers: {
    setUpdateProfileData: (state, action: PayloadAction<ProfileData>) => {
      state = action.payload;
    },
    setUpdateUserAddress: (state, action: PayloadAction<ProfileAddress>) => {
      state.address = action.payload;
    },
    setUpdateUserFatecEducation: (state, action: PayloadAction<ProfileFatecEducation>) => {
      state.fatec_education = action.payload;
    },
    setUpdateUserEducation: (state, action: PayloadAction<ProfileEducation>) => {
      state.education.push(action.payload);
    },
    changeUserEducation: (state, action: PayloadAction<{index: number; education: ProfileEducation}>) => {
      state.education[action.payload.index] = action.payload.education;
    },
    removeUserEducation: (state, action: PayloadAction<{index: number}>) => {
      state.education.splice(action.payload.index, 1);
    },

    setUpdateUserPreviousExperience: (state, action: PayloadAction<ProfilePreviousExperience>) => {
      state.previous_experience.push(action.payload);
    },
    eraseUpdateUserPreviousExperience: state => {
      state.previous_experience = [];
    },
    changeUserPreviousExperience: (
      state,
      action: PayloadAction<{index: number; previousExperience: ProfilePreviousExperience}>,
    ) => {
      state.previous_experience[action.payload.index] = action.payload.previousExperience;
    },
    removeUserPreviousExperience: (state, action: PayloadAction<{index: number}>) => {
      state.previous_experience.splice(action.payload.index, 1);
    },

    setUpdateUserLinks: (state, action: PayloadAction<ProfileLinks>) => {
      state.links = {...state.links, ...action.payload};
    },

    setUpdateUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setUpdateUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    setUpdateUserTechStacks: (state, action: PayloadAction<string>) => {
      state.tech_stacks.push(action.payload);
    },
    removeUserTechStacks: (state, action: PayloadAction<{index: number}>) => {
      state.tech_stacks.splice(action.payload.index, 1);
    },

    setUpdateUserCertifications: (state, action: PayloadAction<string>) => {
      state.certifications.push(action.payload);
    },
    deleteUpdateUserCertifications: (state, action: PayloadAction<{index: number}>) => {
      state.certifications.splice(action.payload.index, 1);
    },
  },
});

export const {
  setUpdateProfileData,
  setUpdateUserAddress,
  setUpdateUserFatecEducation,
  setUpdateUserEducation,
  changeUserEducation,
  removeUserEducation,
  setUpdateUserPreviousExperience,
  eraseUpdateUserPreviousExperience,
  changeUserPreviousExperience,
  removeUserPreviousExperience,
  setUpdateUserLinks,
  setUpdateUserName,
  setUpdateUserPhone,
  setUpdateUserTechStacks,
  removeUserTechStacks,
  setUpdateUserCertifications,
  deleteUpdateUserCertifications,
} = updateProfileDataSlice.actions;

export default updateProfileDataSlice.reducer;
