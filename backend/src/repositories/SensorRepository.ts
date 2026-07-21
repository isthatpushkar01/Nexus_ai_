import { Sensor, ISensor } from '../models/Sensor.js';
import type { Sensor as SensorType } from '../types/index.js';

export class SensorRepository {
  async findById(id: string): Promise<ISensor | null> {
    return Sensor.findById(id);
  }

  async findByMachineId(machineId: string): Promise<ISensor[]> {
    return Sensor.find({ machineId });
  }

  async create(data: Partial<SensorType>): Promise<ISensor> {
    const sensor = new Sensor(data);
    return sensor.save();
  }

  async update(id: string, data: Partial<SensorType>): Promise<ISensor | null> {
    return Sensor.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await Sensor.findByIdAndDelete(id);
  }

  async findByType(machineId: string, type: string): Promise<ISensor[]> {
    return Sensor.find({ machineId, type });
  }
}
