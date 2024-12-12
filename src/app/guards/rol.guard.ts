import { CanActivateFn } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface payload extends JwtPayload{
  usuario_id: number,
  usuario_rol: string
}

export const rolGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const data = jwtDecode<payload>(token!)
  const requiredRoles = route.data?.['roles'] as string[]; 

  if (requiredRoles?.includes(data.usuario_rol)) {
      return true;
  }
  return false
};
