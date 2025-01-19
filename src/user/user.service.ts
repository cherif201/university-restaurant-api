import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper method: check if current user is CHEF.
   * Throws ForbiddenException if not.
   */
  private ensureChefRole(currentUser: User | any) {
    if (!currentUser || currentUser.role !== 'CHEF') {
      throw new ForbiddenException('Only CHEF can perform this action');
    }
  }

  /**
   * Get ALL users (CHEF only).
   */
  async findAll(currentUser: User | any) {
    this.ensureChefRole(currentUser);
    return this.prisma.user.findMany();
  }

  /**
   * Get one user by ID (CHEF only).
   */
  async findOne(currentUser: User | any, id: number) {
    this.ensureChefRole(currentUser);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  /**
   * Update user by ID (CHEF only).
   */
  async update(currentUser: User | any, id: number, updateUserDto: UpdateUserDto) {
    this.ensureChefRole(currentUser);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /**
   * Return user along with extra data (CHEF only).
   */
  async getUserById(currentUser: User | any, id: number) {
    this.ensureChefRole(currentUser);

    return this.prisma.user.findUnique({
      where: { id },
      include: {
        UserPrefs: {
          select: {
            eatsSalad: true,
            eatsBread: true,
          },
        },
        Post: true,
      },
    });
  }

  /**
   * Partially update user by ID (CHEF only).
   */
  async updateUserById(currentUser: User | any, id: number, data: Prisma.UserUpdateInput) {
    this.ensureChefRole(currentUser);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('User not found', 404);

    if (data.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (existingUser) throw new HttpException('Username already taken', 400);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  /**
   * Find all users with a given role (CHEF only).
   */
  async findByRole(currentUser: User | any, userRole: role) {
    this.ensureChefRole(currentUser);

    const users = await this.prisma.user.findMany({
      where: { role: userRole },
    });
    if (!users.length) throw new HttpException('No users with this role found', 404);
    return users;
  }

  /**
   * Delete ALL users (CHEF only).
   */
  async deleteAllUsers(currentUser: User | any) {
    this.ensureChefRole(currentUser);

    await this.prisma.user.deleteMany();
    return { message: 'All users have been deleted' };
  }

  /**
   * Delete ONE user (CHEF only) - the same logic as before.
   */
  async deleteUserAndData(currentUser: User | any, userId: number) {
    this.ensureChefRole(currentUser);

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id: userId } });
    return { message: `User and all related data have been deleted` };
  }
}
