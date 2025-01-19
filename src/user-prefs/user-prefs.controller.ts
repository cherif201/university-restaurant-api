import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserPrefsService } from './user-prefs.service';
import { CreateUserPrefsDto } from './dto/create-user-prefs.dto';
import { UpdateUserPrefsDto } from './dto/update-user-prefs.dto';
import {  ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('User Preferences')

@Controller('user-prefs')  
export class UserPrefsController {
  constructor(private readonly userPrefsService: UserPrefsService) {}

  @Post()
  @ApiOperation({ summary: 'Create user preferences' })
  @ApiBody({ type: CreateUserPrefsDto })
  create(@Body() createUserPrefsDto: CreateUserPrefsDto) {
    return this.userPrefsService.create(createUserPrefsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user preferences' })
  findAll() {
    return this.userPrefsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user preferences by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userPrefsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user preferences by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserPrefsDto: UpdateUserPrefsDto) {
    return this.userPrefsService.update(id, updateUserPrefsDto);
  }
  @Get('count/:preference/:value')
@ApiOperation({ summary: 'Get count of users by preference' })
async countUsersByPreference(
  @Param('preference') preference: 'eatsSalad' | 'eatsBread',
  @Param('value') value: 'true' | 'false',
) {
  const booleanValue = value === 'true';
  return this.userPrefsService.countUsersByPreference(preference, booleanValue);
}


  @Delete(':id')
  @ApiOperation({ summary: 'Delete user preferences by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userPrefsService.remove(id);
  }
}
