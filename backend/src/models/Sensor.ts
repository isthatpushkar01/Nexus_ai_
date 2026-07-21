import mongoose, { Schema, Document } from 'mongoose';

export interface ISensor extends Document {
  machineId: mongoose.Types.ObjectId;
  name: string;
  type: 'temperature' | 'pressure' | 'humidity' | 'vibration' | 'current' | 'voltage' | 'rpm' | 'power' | 'custom';
  unit: string;
  minValue: number;
  maxValue: number;
  warningThreshold: number;
  criticalThreshold: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const sensorSchema = new Schema<ISensor>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['temperature', 'pressure', 'humidity', 'vibration', 'current', 'voltage', 'rpm', 'power', 'custom'],
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    warningThreshold: {
      type: Number,
      required: true,
    },
    criticalThreshold: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

sensorSchema.index({ machineId: 1 });
sensorSchema.index({ type: 1 });

export const Sensor = mongoose.model<ISensor>('Sensor', sensorSchema);
