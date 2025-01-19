import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  ParseIntPipe,
  Patch,
  UseGuards,
  Req,
  Query,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { role } from '@prisma/client';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * GET all users (CHEF only).
   */
  @Get()
  @ApiOperation({ summary: 'Get all users (CHEF only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Access denied.' })
  async findAll(@Req() req) {
    return this.userService.findAll(req.user);
  }

  /**
   * GET user by ID (CHEF only).
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID (CHEF only)' })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID to retrieve' })
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.userService.findOne(req.user, id);
  }

  /**
   * Update a user by ID (CHEF only).
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID (CHEF only)' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID to update' })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.userService.update(req.user, id, updateUserDto);
  }

  /**
   * GET users by role (CHEF only).
   */
  @Get('role/:role')
  @ApiOperation({ summary: 'Get users by role (CHEF only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  @ApiParam({ name: 'role', enum: role, description: 'Role to filter by' })
  findByRole(@Param('role') userRole: role, @Req() req) {
    return this.userService.findByRole(req.user, userRole);
  }

  /**
   * PARTIALLY update a user by ID (CHEF only).
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a user by ID (CHEF only)' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID to update' })
  @ApiBody({ type: UpdateUserDto })
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.userService.updateUserById(req.user, id, updateUserDto);
  }

  /**
   * DELETE ALL users (CHEF only).
   */
  @Delete()
  @ApiOperation({ summary: 'Delete ALL users (CHEF only)' })
  @ApiResponse({ status: 200, description: 'All users have been deleted.' })
  async deleteAllUsers(@Req() req) {
    return this.userService.deleteAllUsers(req.user);
  }

  /**
   * DELETE a single user and data (CHEF only).
   */
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a single user (CHEF only)' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID to delete' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Only CHEF can delete.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUserAndData(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req,
  ) {
    return this.userService.deleteUserAndData(req.user, userId);
  }
}
