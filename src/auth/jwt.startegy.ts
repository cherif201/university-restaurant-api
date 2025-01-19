import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../auth/jwt-payload.interface';  // Define your JWT Payload interface
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,  // Use your JWT secret
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new Error('User not found');
    }
  
    // Return a custom object that includes sub
    return {
      sub: user.id,
      username: user.username,
      role: user.role,
      // plus anything else you want in req.user
    };
  }
}
