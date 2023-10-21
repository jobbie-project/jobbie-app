import {EducationLevel} from '@/enums';

export interface User {
  name: string;
  email: string;
  phone: string;
  student: {
    phone?: string;
    birth_date?: Date;
    curriculum: {
      previous_experience: {
        company_name: string;
        position: string;
        start_date: Date;
        end_date?: Date;
        location?: {
          city: string;
          state: string;
        };
        description?: string;
      }[];
      fatec_institution: {
        id: string;
        name: string;
      };
      fatec_course: {
        id: string;
        name: string;
      };
      fatec_cycle: number;
      fatec_start_date: Date;
      education: {
        institution_name: string;
        course: string;
        degree: EducationLevel;
        start_date: Date;
        end_date?: Date | undefined;
        location: {
          city: string;
          state: string;
        };
      }[];
      certifications: string[];
      address: {street: string; city: string; state: string; zip_code: string};
    };
  };
}
