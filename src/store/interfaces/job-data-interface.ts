import {ContractType, JobTime, JobType} from '@/enums';

export interface JobData {
  company_name: string;
  owner_name: string;
  owner_email: string;
  position: string;
  salary: number;
  num_positions: string;
  location?: {
    city: string;
    state: string;
  };
  description: string;
  type: JobType | undefined;
  job_time: JobTime;
  contract_type: ContractType;
}
