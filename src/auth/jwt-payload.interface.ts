import { role } from "@prisma/client";

export interface JwtPayload {
    username: string;
    sub: number;  // user ID
    role : role;
  }
  