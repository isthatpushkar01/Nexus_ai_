import { User, IUser } from '../models/User.js';
import type { User as UserType } from '../types/index.js';

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }

  async create(data: Partial<UserType>): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  async update(id: string, data: Partial<UserType>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async findByFactoryId(factoryId: string, limit: number = 50, skip: number = 0): Promise<IUser[]> {
    return User.find({ factoryId }).limit(limit).skip(skip);
  }

  async countByFactoryId(factoryId: string): Promise<number> {
    return User.countDocuments({ factoryId });
  }
}
