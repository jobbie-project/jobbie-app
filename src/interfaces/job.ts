import {ContractType, JobStatus, JobTime, JobType} from '@/enums';
import {Company} from './company';
import {JobApplicants} from './job-applicants';

export interface Job {
  position: string;
  description: string;
  salary: string;
  company?: Company;
  owner_name: string;
  owner_email: string;
  num_positions: string;
  contract_type: ContractType;
  job_time: JobTime;
  created_at: Date;
  code: string;
  status: JobStatus;
  company_name: string;
  type: JobType;
  location: {
    city: string;
    state: string;
  };
  applicants: JobApplicants[];
  fatec_course: {
    name: string;
    abbreviation: string;
  };
}
