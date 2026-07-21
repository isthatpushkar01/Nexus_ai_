export interface User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'super-admin' | 'factory-admin' | 'manager' | 'engineer' | 'operator' | 'auditor';
  factoryId: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface Factory {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Machine {
  _id?: string;
  factoryId: string;
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
  sensors: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Sensor {
  _id?: string;
  machineId: string;
  name: string;
  type: 'temperature' | 'pressure' | 'humidity' | 'vibration' | 'current' | 'voltage' | 'rpm' | 'power' | 'custom';
  unit: string;
  minValue: number;
  maxValue: number;
  warningThreshold: number;
  criticalThreshold: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SensorReading {
  _id?: string;
  machineId: string;
  sensorId: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Prediction {
  _id?: string;
  machineId: string;
  type: 'maintenance' | 'production' | 'energy' | 'quality';
  prediction: string;
  confidence: number;
  estimatedDate: Date;
  recommendation: string;
  rootCauses?: string[];
  createdAt?: Date;
}

export interface Alert {
  _id?: string;
  machineId: string;
  type: 'sensor-anomaly' | 'maintenance-due' | 'production-issue' | 'energy-spike' | 'quality-defect';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'open' | 'acknowledged' | 'resolved';
  createdAt?: Date;
  resolvedAt?: Date | null;
}

export interface Production {
  _id?: string;
  factoryId: string;
  machineId: string;
  date: Date;
  quantity: number;
  target: number;
  defects: number;
  efficiency: number;
  downtime: number;
  notes?: string;
  createdAt?: Date;
}

export interface Maintenance {
  _id?: string;
  machineId: string;
  type: 'preventive' | 'corrective' | 'predictive';
  description: string;
  scheduledDate: Date;
  completedDate?: Date | null;
  engineer: string;
  parts: string[];
  cost: number;
  status: 'scheduled' | 'in-progress' | 'completed';
  createdAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: Partial<User>;
    token: string;
    refreshToken: string;
  };
  message?: string;
  error?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
