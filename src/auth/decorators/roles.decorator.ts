import { SetMetadata } from '@nestjs/common';
import { role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: role[]) => SetMetadata(ROLES_KEY, roles);


export const IS_PUBLIC_KEY = 'isPublic'; 
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

