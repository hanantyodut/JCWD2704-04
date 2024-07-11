export interface IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  points: number;
  pointExpire?: Date;
  referalCode: string;
  referalTo?: string;
}
export interface IAdmin {
  id: number;
  name: string;
  isActive: boolean;
  address: string;
  email: string;
  password?: string;
}
