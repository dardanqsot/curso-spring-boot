import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro, LibroPage } from 'src/app/interfaces/libro.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiBase: string = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }


  getLibros(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'fechaCreacion,desc')

    return this.http.get<LibroPage>(`${this.apiBase}/admin/libros`, { params });
  }

  crearLibro(libro: Libro) {
    return this.http.post(`${this.apiBase}/admin/libros`, libro);
  }

}
