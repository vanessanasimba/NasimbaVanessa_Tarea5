import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from '../Interfaces/IUsuario';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  apiurl='http://localhost:8080/CrudClases/controller/usuario.controller.php?op=';

  constructor(
    private lector: HttpClient,
    private navegacion:Router
  ) { 
    this.checkLoginStatus();
  }

  login(usuario:IUsuario){
    let formData = new FormData();
    formData.append('Nombre_usuario', usuario.Nombre_usuario);
    formData.append('Contrasenia', usuario.Contrasenia);
    console.log(usuario);
    return this.lector.post<any>(this.apiurl + 'login', formData).subscribe((respuesta) => {
      if (respuesta.success == 'true' || respuesta.idUsuarios > 0) {
        console.log(respuesta);
        //variables de entorno -- variables locales -- variables de sesion

        sessionStorage.setItem('nombreUsuario', respuesta.Nombre_Usuario);
        sessionStorage.setItem('rolesIdRoles', respuesta.Roles_idRoles.toString());
        localStorage.setItem('rolesIdRoles', respuesta.Roles_idRoles.toString());
        this.loggedIn.next(true);
        this.navegacion.navigate(['/dashboard/default']);
      } else {
        console.log(respuesta);
        this.navegacion.navigate(['/login/' + respuesta.error]);
      }
    });
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.navegacion.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  checkLoginStatus() {
    const usuario = sessionStorage.getItem('rolesIdRoles');
    if (parseInt(usuario) > 0) {
      this.loggedIn.next(true);
    }
  }

  todos():Observable<IUsuario[]>{
    return this.lector.get<IUsuario[]>(this.apiurl + 'todos');
  }

  uno(usuario:IUsuario):Observable<IUsuario>{
    let formData = new FormData();
    formData.append('idUsuarios', usuario.idUsuarios.toString());
    return this.lector.post<IUsuario>(this.apiurl + 'uno',usuario);
  }
}