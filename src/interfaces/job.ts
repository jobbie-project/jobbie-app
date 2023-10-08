import {ContractType, JobStatus, JobTime, JobType} from '@/enums';
import {Company} from './company';

export interface Job {
  position: string;
  description: string;
  salary: number;
  company?: Company;
  owner_name: string;
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
}
