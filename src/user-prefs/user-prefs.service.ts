import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserPrefsDto } from './dto/create-user-prefs.dto';
import { UpdateUserPrefsDto } from './dto/update-user-prefs.dto';

@Injectable()
export class UserPrefsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPrefsDto: CreateUserPrefsDto) {
    return this.prisma.userPrefs.create({
      data: createUserPrefsDto,
    });
  }

  async findAll() {
    return this.prisma.userPrefs.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number) {
    const userPrefs = await this.prisma.userPrefs.findUnique({ where: { id } });
    if (!userPrefs) throw new NotFoundException('User preferences not found');
    return userPrefs;
  }

  async update(id: number, updateUserPrefsDto: UpdateUserPrefsDto) {
    const exists = await this.prisma.userPrefs.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User preferences not found');

    return this.prisma.userPrefs.update({
      where: { id },
      data: updateUserPrefsDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.userPrefs.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User preferences not found');

    return this.prisma.userPrefs.delete({ where: { id } });
  }
  async countUsersByPreference(preference: 'eatsSalad' | 'eatsBread', value: boolean) {
    return this.prisma.userPrefs.count({
      where: {
        [preference]: value,
      },
    });
  }
}
