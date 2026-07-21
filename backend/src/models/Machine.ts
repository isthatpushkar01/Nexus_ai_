import mongoose, { Schema, Document } from 'mongoose';

export interface IMachine extends Document {
  factoryId: mongoose.Types.ObjectId;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  location: string;
  machineType: string;
  status: 'running' | 'idle' | 'maintenance' | 'error' | 'offline';
  health: {
    score: number;
    status: 'healthy' | 'warning' | 'critical';
    remainingUsefulLife: number;
    lastMaintenance: Date | null;
  };
  installationDate: Date;
  sensors: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const machineSchema = new Schema<IMachine>(
  {
    factoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Factory',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    machineType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['running', 'idle', 'maintenance', 'error', 'offline'],
      default: 'offline',
    },
    health: {
      score: {
        type: Number,
        default: 100,
        min: 0,
        max: 100,
      },
      status: {
        type: String,
        enum: ['healthy', 'warning', 'critical'],
        default: 'healthy',
      },
      remainingUsefulLife: {
        type: Number,
        default: 0,
      },
      lastMaintenance: {
        type: Date,
        default: null,
      },
    },
    installationDate: {
      type: Date,
      required: true,
    },
    sensors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Sensor',
      },
    ],
  },
  { timestamps: true }
);

machineSchema.index({ factoryId: 1 });
machineSchema.index({ serialNumber: 1 });
machineSchema.index({ status: 1 });

export const Machine = mongoose.model<IMachine>('Machine', machineSchema);
