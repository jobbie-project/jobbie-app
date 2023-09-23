import {ContractType, JobTime, JobType} from '@/enums';

export interface JobData {
  company_name: string;
  owner: string;
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
  time: JobTime;
  contract_type: ContractType;
}
