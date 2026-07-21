import mongoose, { Schema, Document } from 'mongoose';

export interface IPrediction extends Document {
  machineId: mongoose.Types.ObjectId;
  type: 'maintenance' | 'production' | 'energy' | 'quality';
  prediction: string;
  confidence: number;
  estimatedDate: Date;
  recommendation: string;
  rootCauses?: string[];
  createdAt: Date;
}

const predictionSchema = new Schema<IPrediction>(
  {
    machineId: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['maintenance', 'production', 'energy', 'quality'],
      required: true,
      index: true,
    },
    prediction: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    estimatedDate: {
      type: Date,
      required: true,
    },
    recommendation: {
      type: String,
      required: true,
    },
    rootCauses: [String],
  },
  { timestamps: true }
);

predictionSchema.index({ machineId: 1, type: 1 });

export const Prediction = mongoose.model<IPrediction>('Prediction', predictionSchema);
