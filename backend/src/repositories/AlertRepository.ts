import { Alert, IAlert } from '../models/Alert.js';

export class AlertRepository {
  async findById(id: string): Promise<IAlert | null> {
    return Alert.findById(id);
  }

  async findByMachineId(machineId: string, limit: number = 50, skip: number = 0): Promise<IAlert[]> {
    return Alert.find({ machineId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
  }

  async countByMachineId(machineId: string): Promise<number> {
    return Alert.countDocuments({ machineId });
  }

  async create(data: Partial<IAlert>): Promise<IAlert> {
    const alert = new Alert(data);
    return alert.save();
  }

  async update(id: string, data: Partial<IAlert>): Promise<IAlert | null> {
    return Alert.findByIdAndUpdate(id, data, { new: true });
  }

  async findByStatus(status: string, limit: number = 50, skip: number = 0): Promise<IAlert[]> {
    return Alert.find({ status })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
  }

  async findBySeverity(severity: string, limit: number = 50, skip: number = 0): Promise<IAlert[]> {
    return Alert.find({ severity })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
  }
}
