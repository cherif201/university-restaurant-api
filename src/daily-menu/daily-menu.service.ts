import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { User } from '@prisma/client'; // Or wherever your 'User' type is defined

@Injectable()
export class DailyMenuService {
  constructor(private readonly prisma: PrismaService) {}

  // Only CHEF can create a daily menu
  async create(user: User, title: string, description: string, date?: Date) {
    if (user.role !== 'CHEF') {
      throw new ForbiddenException('Only a CHEF can create a daily menu.');
    }
    return this.prisma.dailyMenu.create({
      data: {
        title,
        description,
        date: date || new Date(), 
      },
    });
  }

  // Anyone can get all daily menus
  async findAll() {
    return this.prisma.dailyMenu.findMany();
  }

  // Anyone can get a specific daily menu by ID
  async findOne(id: number) {
    return this.prisma.dailyMenu.findUnique({
      where: { id },
    });
  }

  // Only CHEF can update a daily menu
  async update(user: User, id: number, title?: string, description?: string, date?: Date) {
    if (user.role !== 'CHEF') {
      throw new ForbiddenException('Only a CHEF can update a daily menu.');
    }
    return this.prisma.dailyMenu.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(date && { date }),
      },
    });
  }

  // Only CHEF can delete a daily menu
  async remove(user: User, id: number) {
    if (user.role !== 'CHEF') {
      throw new ForbiddenException('Only a CHEF can delete a daily menu.');
    }
    return this.prisma.dailyMenu.delete({
      where: { id },
    });
  }
}
