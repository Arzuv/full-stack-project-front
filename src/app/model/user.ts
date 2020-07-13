export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  created: Date;
  roles: Roles[];
}

export enum Roles {
  USER = 'USER', ADMIN= 'ADMIN'
}
