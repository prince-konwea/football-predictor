import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HelperService } from 'src/common/helpers';
import { User, UserDocument } from './model/user.model';
import { RegisterUserDto } from './dto/register.user.dto';
import { NotFoundError, RequiredParameterError, UnauthorizedError, UniqueConstraintError } from 'src/common/errors';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly helperService: HelperService,
  ) {}

  
  async registerUser(dto: RegisterUserDto) {
    const { email, username, password } = dto;

    if (!email || !username || !password) {
      throw new RequiredParameterError('Email, username, and password are required');
    }

    const existing = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) {
      throw new UniqueConstraintError('Email or username already exists');
    }

    const hashedPassword = await this.helperService.hashPassword(password);

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    const sanitized = this.helperService.sanitizeUser(user);
    return this.helperService.successResponse('User registered successfully', sanitized);
  }

  
  async loginUser(emailOrUsername: string, plainPassword: string) {
    if (!emailOrUsername || !plainPassword) {
      throw new RequiredParameterError('Username/email and password are required');
    }

    const user = await this.userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) throw new UnauthorizedError('Invalid credentials');

    const isMatch = await this.helperService.comparePassword(plainPassword, user.password);
    if (!isMatch) throw new UnauthorizedError('Invalid credentials');

    const sanitized = this.helperService.sanitizeUser(user);
    return this.helperService.successResponse('Login successful', sanitized);
  }

  
  async findUserById(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) throw new NotFoundError('User not found');
    return this.helperService.sanitizeUser(user);
  }

  
  async updateUserPoints(userId: string, points: number) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    user.totalPoints += points;
    await user.save();

    return this.helperService.successResponse('Points updated successfully', {
      userId,
      totalPoints: user.totalPoints,
    });
  }
}
