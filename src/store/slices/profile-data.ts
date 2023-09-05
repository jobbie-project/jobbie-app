import {EducationLevel} from '@/interfaces/education-level';
import {createSlice} from '@reduxjs/toolkit';

export const profileDataSlice = createSlice({
  name: 'profileData',
  initialState: {
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip_code: '',
    },
    education: [
      {
        institution_name: '',
        degree: '',
        level: null as EducationLevel | null,
        start_date: '',
        end_date: '',
        actual_cycle: '',
        course: '',
        location: {
          city: '',
          state: '',
        },
      },
    ],
    previous_experience: [
      {
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        location: {
          city: '',
          state: '',
        },
        description: '',
      },
    ],
    tech_stacks: [''],
    certifications: [''],
    links: {
      github: '',
      linkedin: '',
      portfolio: '',
    },
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },

    setUserEducation: (state, action) => {
      !state.education[0].institution_name && (state.education = []);
      state.education.push(action.payload);
    },
    updateUserEducation: (state, action) => {
      state.education[action.payload.index] = action.payload.education;
    },
    deleteUserEducation: (state, action) => {
      state.education.splice(action.payload.index, 1);
    },

    setUserPreviousExperience: (state, action) => {
      state.previous_experience.push(action.payload);
    },
    updateUserPreviousExperience: (state, action) => {
      state.previous_experience[action.payload.index] = action.payload.previousExperience;
    },
    deleteUserPreviousExperience: (state, action) => {
      state.previous_experience.splice(action.payload.index, 1);
    },

    setUserLinks: (state, action) => {
      state.links = action.payload;
    },

    setUserName: (state, action) => {
      state.name = action.payload;
    },

    setUserPhone: (state, action) => {
      state.phone = action.payload;
    },

    setUserTechStacks: (state, action) => {
      state.tech_stacks.push(action.payload);
    },
    deleteUserTechStacks: (state, action) => {
      state.tech_stacks.splice(action.payload.index, 1);
    },

    setUserCertifications: (state, action) => {
      state.certifications.push(action.payload);
    },
    deleteUserCertifications: (state, action) => {
      state.certifications.splice(action.payload.index, 1);
    },
  },
});

export const {
  setUserAddress,
  setUserEducation,
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
  deleteUserCertifications,
} = profileDataSlice.actions;

export default profileDataSlice.reducer;
