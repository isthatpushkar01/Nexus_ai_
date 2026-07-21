import mongoose, { Schema, Document } from 'mongoose';

export interface ISensorData extends Document {
  machineId: mongoose.Types.ObjectId;
  sensorId: mongoose.Types.ObjectId;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
  metadata?: Record<string, any>;
}

const sensorDataSchema = new Schema<ISensorData>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
      required: true,
      index: true,
    },
    sensorId: {
      type: Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true,
      index: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['normal', 'warning', 'critical'],
      default: 'normal',
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: false }
);

// Create compound index for queries
sensorDataSchema.index({ machineId: 1, timestamp: -1 });
sensorDataSchema.index({ sensorId: 1, timestamp: -1 });

// TTL index to automatically delete old data after 90 days
sensorDataSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

export const SensorData = mongoose.model<ISensorData>('SensorData', sensorDataSchema);
