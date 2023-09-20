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
  type: 'face-to-face' | 'remote' | undefined;
  time: string;
  contract_type: string;
}
