import {EducationLevel} from '@/interfaces/education-level';

export interface ProfileEducation {
  institution_name: string;
  degree: string;
  level: EducationLevel | null;
  start_date: Date;
  end_date?: Date;
  actual_cycle: string;
  course: string;
  location: {
    city: string;
    state: string;
  };
}

export interface ProfilePreviousExperience {
  company_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  location: {
    city: string;
    state: string;
  };
  description: string;
}

export interface ProfileData {
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  education: ProfileEducation[];
  previous_experience: ProfilePreviousExperience[];
  tech_stacks: string[];
  certifications: string[];
  links: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}
