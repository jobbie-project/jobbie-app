import {ProfileFatecEducation} from '@/store/interfaces/profile-data-interface';
interface FormattedProfileData {
  fatec_institution: string;
  fatec_course: string;
  fatec_cycle: number;
  fatec_start_date: Date;
}
export function castFatecEducationData(fatecEducation: ProfileFatecEducation): FormattedProfileData {
  const payload: FormattedProfileData = {
    fatec_institution: fatecEducation.institution,
    fatec_course: fatecEducation.course,
    fatec_cycle: Number(fatecEducation.actual_cycle),
    fatec_start_date: fatecEducation.start_date,
  };
  return payload;
}
