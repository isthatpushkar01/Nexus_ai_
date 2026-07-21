import { Request, Response } from 'express';
import { MachineService } from '../services/MachineService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const machineService = new MachineService();

export const getMachines = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await machineService.getMachines(
    req.factoryId as string,
    parseInt(page as string),
    parseInt(limit as string)
  );
  res.status(200).json(result);
});

export const getMachineById = asyncHandler(async (req: Request, res: Response) => {
  const result = await machineService.getMachineById(req.params.id);
  res.status(200).json(result);
});

export const createMachine = asyncHandler(async (req: Request, res: Response) => {
  const result = await machineService.createMachine(req.factoryId as string, req.body);
  res.status(201).json(result);
});

export const updateMachine = asyncHandler(async (req: Request, res: Response) => {
  const result = await machineService.updateMachine(req.params.id, req.body);
  res.status(200).json(result);
});

export const deleteMachine = asyncHandler(async (req: Request, res: Response) => {
  const result = await machineService.deleteMachine(req.params.id);
  res.status(200).json(result);
});
