import { Company } from "./company";

export interface Job {
  title: string;
  description: string;
  salary: number;
  company: Company;
  daily_hours: number;
  modalities: "Remoto" | "Presencial";
  sector: string[];
  category: "Efetivo" | "Estágio" | "PJ";
}
