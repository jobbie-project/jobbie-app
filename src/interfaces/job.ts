import {ContractType, JobStatus, JobTime, JobType} from '@/enums';
import {Company} from './company';

export interface Job {
  position: string;
  description: string;
  salary: number;
  company?: Company;
  contract_type: ContractType;
  job_time: JobTime;
  created_at: Date;
  code: string;
  status: JobStatus;
  company_name: string;
  type: JobType;
}
