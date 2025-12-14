/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.body; // 👈 usando body para testear sin token

    if (!user || user.rol !== 'admin') {
      throw new UnauthorizedException('Acceso solo para administradores');
    }
    return true;
  }
} 