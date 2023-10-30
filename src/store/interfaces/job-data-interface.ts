import {ContractType, JobTime, JobType} from '@/enums';

export interface JobData {
  company_name: string;
  owner_name: string;
  owner_email: string;
  position: string;
  salary: string;
  num_positions: string;
  location?: {
    city: string;
    state: string;
  };
  description: string;
  type: JobType | undefined;
  job_time: JobTime;
  contract_type: ContractType;
  job_tag: string;
  has_sorting: boolean;
}
