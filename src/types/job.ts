export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  match: number;
  tech: string[];
  isNew: boolean;
}
