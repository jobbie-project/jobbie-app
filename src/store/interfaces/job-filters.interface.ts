import {ContractType, JobType} from '@/enums';

export interface JobFilters {
  searchTerm?: string;
  contractType: ContractType[];
  jobType: JobType[];
  page?: number;
  code?: string;
  studentName?: string;
}
