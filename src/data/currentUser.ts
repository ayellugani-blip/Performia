export interface CurrentUser {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  department: string;
  organization: string;
  avatarColor: string;
  avatarUrl?: string;
}

export const currentUser: CurrentUser = {
  id: 'usr-alex-morgan',
  name: 'Alex Morgan',
  role: 'HR Director',
  email: 'alex.morgan@contoso.global',
  initials: 'AM',
  department: 'Human Resources',
  organization: 'Contoso Global Enterprise',
  avatarColor: 'bg-[#0078D4]',
};
