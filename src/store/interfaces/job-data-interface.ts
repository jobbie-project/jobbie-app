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
  type: string;
  time: string;
  contract_type: string;
}
