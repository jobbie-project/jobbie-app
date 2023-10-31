import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ProfileAddress,
  ProfileData,
  ProfileEducation,
  ProfileFatecEducation,
  ProfileLinks,
  ProfilePreviousExperience,
} from '../interfaces/profile-data-interface';
import {User} from '@/interfaces/user';
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

export const updateProfileDataSlice = createSlice({
  name: 'updateProfileData',
  initialState: initialState,
  reducers: {
    setUpdateProfileData: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.phone = action.payload.student.phone ?? '';
      state.address = action.payload.student.curriculum.address;
      state.education = action.payload.student.curriculum.education;
      state.fatec_education.institution = action.payload.student.curriculum.fatec_institution.id;
      state.fatec_education.institution_name = action.payload.student.curriculum.fatec_institution.name;
      state.fatec_education.course = action.payload.student.curriculum.fatec_course.id;
      state.fatec_education.course_name = action.payload.student.curriculum.fatec_course.name;
      state.fatec_education.start_date = action.payload.student.curriculum.fatec_start_date;
      state.fatec_education.actual_cycle = action.payload.student.curriculum.fatec_cycle.toString();
      state.certifications = action.payload.student.curriculum.certifications;
      state.previous_experience = action.payload.student.curriculum.previous_experience;
      state.shift = action.payload.student.shift;
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

    setUpdateUserShift: (state, action: PayloadAction<StudentShift>) => {
      state.shift = action.payload;
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
  setUpdateUserShift,
  setUpdateUserTechStacks,
  removeUserTechStacks,
  setUpdateUserCertifications,
  deleteUpdateUserCertifications,
} = updateProfileDataSlice.actions;

export default updateProfileDataSlice.reducer;
