export type FieldType = {
  id: number;
  request: string;
  submitted: string;
  status: 'In-process' | 'Need to start' | 'Completed' | 'Blocked' | '';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'Medium' | 'High' | 'Low' | '';
  dueDate: string;
  estValue: string;
};

export const field: FieldType[] = [
  {
    id: 1,
    request: 'Launch social media campaign for pro',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aishs Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophie Choudhury',
    priority: 'Medium',
    dueDate: '20-11-2024',
    estValue: '6,200,000',
  },
  {
    id: 2,
    request: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: '3,500,000',
  },
];
