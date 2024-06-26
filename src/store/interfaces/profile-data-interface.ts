import {EducationLevel, StudentShift} from '@/enums';

export interface ProfileEducation {
  institution_name: string;
  course: string;
  degree: EducationLevel;
  start_date: Date;
  end_date?: Date | undefined;
  location: {
    city: string;
    state: string;
  };
}

export interface ProfileLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface ProfilePreviousExperience {
  company_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  location?: {
    city: string;
    state: string;
  };
  description?: string;
}

export interface ProfileAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface ProfileFatecEducation {
  institution: string;
  course: string;
  institution_name: string;
  course_name: string;
  start_date: Date;
  actual_cycle: string;
}

export interface ProfileData {
  name: string;
  phone: string;
  address: ProfileAddress;
  fatec_education: ProfileFatecEducation;
  education: ProfileEducation[];
  previous_experience: ProfilePreviousExperience[];
  tech_stacks: string[];
  certifications: string[];
  links: ProfileLinks;
  shift: StudentShift;
}
