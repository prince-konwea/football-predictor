// src/common/helpers/helper.service.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

@Injectable()
export class HelperService {

  generateRandomToken(length = 32): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }


  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }


  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  successResponse(message: string, data: any = {}): Record<string, any> {
    return {
      success: true,
      message,
      data,
    };
  }

  errorResponse(message: string, statusCode = 400): Record<string, any> {
    return {
      success: false,
      message,
      statusCode,
    };
  }


  paginate(totalItems: number, currentPage = 1, pageSize = 10) {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
    };
  }


  sanitizeUser(user: any) {
    const { password, ...rest } = user.toObject ? user.toObject() : user;
    return rest;
  }
}
