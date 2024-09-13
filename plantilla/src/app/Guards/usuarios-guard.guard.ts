import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../Services/usuarios.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class usuariosGuardGuard implements CanActivate {
  constructor(
    private usurioService: UsuariosService,
    private navgacion: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.usurioService.isLoggedIn().pipe(
      map((loggedIn) => {
        console.log(loggedIn);
        if (!loggedIn) {
          this.navgacion.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
};
