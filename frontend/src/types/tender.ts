export type Tender = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  status: string;
  posted: string;
  updated_at: string;
  company: {
    name: string;
  };
  creator_company: string;
};
