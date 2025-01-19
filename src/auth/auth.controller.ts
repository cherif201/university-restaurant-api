import { Controller, Get, Post, Body, Req, UseGuards, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login Route
  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Log in to the application' })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({ type: CreateUserDto })
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  // SignUp Route
  @Post('signup')
  @Public()
  @ApiOperation({ summary: 'Sign up and create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 401, description: 'User already exists.' })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  // Google OAuth Login Route
  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  // Google OAuth Redirect Handler
  @Get('google/redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.googleLogin(req);

    if (typeof result === 'string') {
      return res.status(400).json({ message: result });
    }

    const { token } = result;
    res.redirect(`http://localhost:3000/auth/choose-role?token=${token}`);
  }

  // Role Assignment Route
  @Get('choose-role')
  @Public()
  async chooseRole(@Query('token') token: string, @Query('role') role: string) {
    return this.authService.assignRoleToUser(token, role);
  }
}
