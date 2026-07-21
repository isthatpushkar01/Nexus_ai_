import { MachineRepository } from '../repositories/MachineRepository.js';
import { SensorRepository } from '../repositories/SensorRepository.js';
import { NotFoundError } from '../utils/errors.js';
import type { Machine, ApiResponse } from '../types/index.js';

export class MachineService {
  private machineRepository = new MachineRepository();
  private sensorRepository = new SensorRepository();

  async getMachines(factoryId: string, page: number = 1, limit: number = 10): Promise<ApiResponse> {
    const skip = (page - 1) * limit;
    const [machines, total] = await Promise.all([
      this.machineRepository.findByFactoryId(factoryId, limit, skip),
      this.machineRepository.countByFactoryId(factoryId),
    ]);

    return {
      success: true,
      data: machines,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getMachineById(id: string): Promise<ApiResponse> {
    const machine = await this.machineRepository.findById(id);
    if (!machine) {
      throw new NotFoundError('Machine');
    }
    return {
      success: true,
      data: machine,
    };
  }

  async createMachine(factoryId: string, data: Partial<Machine>): Promise<ApiResponse> {
    const machine = await this.machineRepository.create({
      ...data,
      factoryId,
    });
    return {
      success: true,
      data: machine,
      message: 'Machine created successfully',
    };
  }

  async updateMachine(id: string, data: Partial<Machine>): Promise<ApiResponse> {
    const machine = await this.machineRepository.update(id, data);
    if (!machine) {
      throw new NotFoundError('Machine');
    }
    return {
      success: true,
      data: machine,
      message: 'Machine updated successfully',
    };
  }

  async deleteMachine(id: string): Promise<ApiResponse> {
    const machine = await this.machineRepository.findById(id);
    if (!machine) {
      throw new NotFoundError('Machine');
    }
    await this.machineRepository.delete(id);
    return {
      success: true,
      message: 'Machine deleted successfully',
    };
  }
}
