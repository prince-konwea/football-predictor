import { Controller, Post, Body, Param, Get, HttpCode } from '@nestjs/common';

import { RegisterUserDto } from './dto/register.user.dto';
import { NotFoundError, UnauthorizedError, RequiredParameterError } from 'src/common/errors';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const response = await this.usersService.registerUser(registerUserDto);
      return response;
    } catch (error) {
      
      if (error instanceof RequiredParameterError || error instanceof UnauthorizedError) {
        throw error; 
      }
    
      throw new Error('An error occurred while processing your request');
    }
  }

  
  @Post('login')
  async login(@Body() loginData: { emailOrUsername: string, password: string }) {
    try {
      const response = await this.usersService.loginUser(loginData.emailOrUsername, loginData.password);
      return response;
    } catch (error) {
      
      if (error instanceof UnauthorizedError || error instanceof RequiredParameterError) {
        throw error; 
      }

      throw new Error('An error occurred while processing your request');
    }
  }

  
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const response = await this.usersService.findUserById(id);
      return response;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error; 
      }
      throw new Error('An error occurred while processing your request');
    }
  }

  
  @Post('update-points/:id')
  @HttpCode(200)
  async updatePoints(@Param('id') id: string, @Body() { points }: { points: number }) {
    try {
      const response = await this.usersService.updateUserPoints(id, points);
      return response;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new Error('An error occurred while processing your request');
    }
  }
}
