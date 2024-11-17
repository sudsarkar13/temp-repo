import { Types } from 'mongoose';

export interface AdminSession {
  _id?: Types.ObjectId;
  token: string;
  ip: string;
  userAgent: string;
  device?: string;
  lastActive: Date;
  expiresAt: Date;
}
