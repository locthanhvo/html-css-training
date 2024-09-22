export interface IUserModel {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  location?: string;
  company?: string;
  status?: string;
  description?: string;
  position?: string;
  website?: string;
  teamName?: string;
  rank?: string;
  office?: string;
  teamMail?: string;
  payment?: string;
  billName?: string;
  billAddress?: string;
  state?: string;
  zipCode?: string;
  mentionMessage?: 'in-app' | 'email';
  replyMessage?: 'in-app' | 'email';
  assignTask?: 'in-app' | 'email';
  taskOverdue?: 'in-app' | 'email';
  dailySummary?: 'in-app' | 'email';
  weeklySummary?: 'in-app' | 'email';
  monthlySummary?: 'in-app' | 'email';
  annuallySummary?: 'in-app' | 'email';
}

export interface IUserStatistics {
  total: number;
  new: number;
  top: number;
  other: number;
}
