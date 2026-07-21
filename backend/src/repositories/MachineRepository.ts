import { Machine, IMachine } from '../models/Machine.js';
import type { Machine as MachineType } from '../types/index.js';

export class MachineRepository {
  async findById(id: string): Promise<IMachine | null> {
    return Machine.findById(id).populate('sensors');
  }

  async findByFactoryId(factoryId: string, limit: number = 50, skip: number = 0): Promise<IMachine[]> {
    return Machine.find({ factoryId })
      .limit(limit)
      .skip(skip)
      .populate('sensors');
  }

  async countByFactoryId(factoryId: string): Promise<number> {
    return Machine.countDocuments({ factoryId });
  }

  async create(data: Partial<MachineType>): Promise<IMachine> {
    const machine = new Machine(data);
    return machine.save();
  }

  async update(id: string, data: Partial<MachineType>): Promise<IMachine | null> {
    return Machine.findByIdAndUpdate(id, data, { new: true }).populate('sensors');
  }

  async delete(id: string): Promise<void> {
    await Machine.findByIdAndDelete(id);
  }

  async findByStatus(factoryId: string, status: string): Promise<IMachine[]> {
    return Machine.find({ factoryId, status }).populate('sensors');
  }

  async updateHealth(id: string, health: Partial<any>): Promise<IMachine | null> {
    return Machine.findByIdAndUpdate(id, { health }, { new: true });
  }
}
