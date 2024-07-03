import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    tags: ['user'],
    operationId: 'getAllUser',
    summary: 'Get all user',
    description: 'Get all user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful',
    type: '',
  })
  async findMany(
    @Query() pageOptionsDto: any,
  ) {
  }
}
