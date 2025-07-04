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

export const emptyField: FieldType[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  request: '',
  submitted: '',
  status: '',
  submitter: '',
  url: '',
  assigned: '',
  priority: '',
  dueDate: '',
  estValue: '',
}));

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
    url: 'www.irfankhanportfolio.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: '3,500,000',
  },
  {
    id: 3,
    request: 'Finalize user testing for for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnsondesigns.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    estValue: '4,750,000',
  },
  {
    id: 4,
    request: 'Design new features for the website',
    submitted: '10-01-2024',
    status: 'Completed',
    submitter: 'Emily Green',
    url: 'www.emilygreenart.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    estValue: '5,900,000',
  },
  {
    id: 5,
    request: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrowncreative.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    estValue: '2,800,000',
  },
];
