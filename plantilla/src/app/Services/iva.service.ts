import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iiva } from '../Interfaces/iIva';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  apiurl='http://localhost:8080/CrudClases/controller/iva.controller.php?op=';

  constructor(private lector: HttpClient) { }

  todos(): Observable<Iiva[]> {
    return this.lector.get<Iiva[]>(this.apiurl + 'todos');
  }

  uno(idIVA: number): Observable<Iiva> {
    const formData = new FormData();
    formData.append('idIVA', idIVA.toString());
    return this.lector.post<Iiva>(this.apiurl + 'uno', formData);
  }

}
