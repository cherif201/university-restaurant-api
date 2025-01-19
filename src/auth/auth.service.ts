import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
 
  // Google Login Handler
  async googleLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException('No user from Google');
    }

    const user = await this.prisma.user.upsert({
      where: { email: req.user.email },
      update: {},
      create: {
        username: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        password: 'google_oauth_dummy_password',
        role: 'STUDENT',  // Default role
        
      },
    });

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  // Backend Role Assignment Handler
  async assignRoleToUser(token: string, selectedRole: string) {
    let decoded;

    try {
      decoded = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!Object.values(role).includes(selectedRole as role)) {
      throw new BadRequestException('Invalid role selection');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: decoded.sub },
      data: {
        role: selectedRole as role,
      },
    });

    const newPayload = {
      username: updatedUser.username,
      sub: updatedUser.id,
      role: updatedUser.role,
    };

    const newToken = this.jwtService.sign(newPayload);

    return {
      message: `Your role has been updated to ${selectedRole}`,
      user: updatedUser,
      access_token: newToken,
    };
  }

  // Standard Signup Method
  async signup(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;
     console.log("role" ,role)
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'STUDENT',
      },
    });

    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log(user)
    const token = this.jwtService.sign(payload);

    return {
      message: 'User successfully registered',
      user,
      access_token: token,
      statusCode: 201,
    };
  }

  // Standard Login Method
  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log("role login :", user.role)
    const token = this.jwtService.sign(payload);

    return {
      message: 'Successfully logged in',
      user,
      access_token: token,
      statusCode: 200,
    };
  }
}
