import { SensorData, ISensorData } from '../models/SensorData.js';

export class SensorDataRepository {
  async create(data: Partial<ISensorData>): Promise<ISensorData> {
    const sensorData = new SensorData(data);
    return sensorData.save();
  }

  async findByMachineId(
    machineId: string,
    startDate: Date,
    endDate: Date,
    limit: number = 1000
  ): Promise<ISensorData[]> {
    return SensorData.find({
      machineId,
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .limit(limit)
      .sort({ timestamp: -1 });
  }

  async findBySensorId(
    sensorId: string,
    startDate: Date,
    endDate: Date,
    limit: number = 1000
  ): Promise<ISensorData[]> {
    return SensorData.find({
      sensorId,
      timestamp: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .limit(limit)
      .sort({ timestamp: -1 });
  }

  async getLatestByMachineId(machineId: string): Promise<ISensorData[]> {
    return SensorData.find({ machineId })
      .sort({ timestamp: -1 })
      .limit(1);
  }

  async getAverageByMachineId(
    machineId: string,
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    return SensorData.aggregate([
      {
        $match: {
          machineId: new (SensorData as any).prototype.constructor.db.Types.ObjectId(machineId),
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: '$sensorId',
          avgValue: { $avg: '$value' },
          minValue: { $min: '$value' },
          maxValue: { $max: '$value' },
        },
      },
    ]);
  }
}
