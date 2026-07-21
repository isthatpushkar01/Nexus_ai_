import { Request } from 'express';
import type { User } from './index.js';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<User>;
      userId?: string;
      factoryId?: string;
      token?: string;
    }
  }
}
