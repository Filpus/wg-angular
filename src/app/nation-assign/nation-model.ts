import { Culture, Religion } from '../dictionary-management/model';

export interface Nation {
  id: number;
  name: string;
  cultureId: number;
  religionId: number;

}

export interface AccessToNation {
  id: number;
  nationId: number;
  userId: number;
  isActive: boolean;
  dateAcquired: Date;

}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isArchived: boolean;

}