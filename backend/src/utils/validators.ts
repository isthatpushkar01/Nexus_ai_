import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  factoryId: z.string().min(1, 'Factory ID is required'),
});

export const machineSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  model: z.string().min(2, 'Model must be at least 2 characters'),
  manufacturer: z.string().min(2, 'Manufacturer must be at least 2 characters'),
  serialNumber: z.string().min(5, 'Serial number must be at least 5 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  machineType: z.string().min(2, 'Machine type must be at least 2 characters'),
  installationDate: z.string().datetime('Invalid date format'),
});

export const sensorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['temperature', 'pressure', 'humidity', 'vibration', 'current', 'voltage', 'rpm', 'power', 'custom']),
  unit: z.string().min(1, 'Unit is required'),
  minValue: z.number(),
  maxValue: z.number(),
  warningThreshold: z.number(),
  criticalThreshold: z.number(),
});

export const sensorDataSchema = z.object({
  value: z.number(),
  timestamp: z.string().datetime().optional(),
});

export const factorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  industry: z.string().min(2, 'Industry must be at least 2 characters'),
});
