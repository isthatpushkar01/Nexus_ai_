import { UserRepository } from '../repositories/UserRepository.js';
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js';
import { AuthenticationError, ConflictError, ValidationError } from '../utils/errors.js';
import type { User, AuthResponse } from '../types/index.js';

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const tokens = generateTokens(user);
    return {
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          factoryId: user.factoryId.toString(),
        },
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async register(data: Partial<User>): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email as string);
    if (existingUser) {
      throw new ConflictError('Email already in use');
    }

    const user = await this.userRepository.create(data);
    const tokens = generateTokens(user);

    return {
      success: true,
      data: {
        user: {
          _id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          factoryId: user.factoryId.toString(),
        },
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const tokens = generateTokens(user);
    return {
      success: true,
      data: {
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      },
    };
  }
}
