import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://localhost:3000/api/productos';
  private urlUsuarios = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  // Productos
  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/${id}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(this.urlApi, data);
  }

  public update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${id}`, data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }

  public search(q: string): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/buscar?q=${encodeURIComponent(q)}`);
  }

  // Usuarios
  public getUsuarios(): Observable<any> {
    return this.http.get<any>(this.urlUsuarios);
  }

  public createUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.urlUsuarios, data);
  }
}
