import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  machineId: mongoose.Types.ObjectId;
  type: 'sensor-anomaly' | 'maintenance-due' | 'production-issue' | 'energy-spike' | 'quality-defect';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'open' | 'acknowledged' | 'resolved';
  createdAt: Date;
  resolvedAt: Date | null;
}

const alertSchema = new Schema<IAlert>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['sensor-anomaly', 'maintenance-due', 'production-issue', 'energy-spike', 'quality-defect'],
      required: true,
      index: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'acknowledged', 'resolved'],
      default: 'open',
      index: true,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

alertSchema.index({ machineId: 1, status: 1 });
alertSchema.index({ createdAt: -1 });

export const Alert = mongoose.model<IAlert>('Alert', alertSchema);
