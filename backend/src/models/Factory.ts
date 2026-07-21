import mongoose, { Schema, Document } from 'mongoose';

export interface IFactory extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  industry: string;
  machineCount: number;
  operatorCount: number;
  status: 'active' | 'inactive';
  subscription: 'free' | 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

const factorySchema = new Schema<IFactory>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    machineCount: {
      type: Number,
      default: 0,
    },
    operatorCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    subscription: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise'],
      default: 'free',
    },
  },
  { timestamps: true }
);

factorySchema.index({ email: 1 });
factorySchema.index({ status: 1 });

export const Factory = mongoose.model<IFactory>('Factory', factorySchema);
