export interface JobData {
  company_name: string;
  owner: string;
  owner_email: string;
  position: string;
  salary: string;
  num_positions: number;
  location?: {
    city: string;
    state: string;
  };
  description: string;
  type: string;
  time: string;
  date?: Date;
}
