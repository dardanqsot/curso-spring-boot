import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LibroPage } from '../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private  apiBase: string = environment.apiBase;
  constructor(
    private http: HttpClient
  ) { }

  getLibros(page: number = 0, size: number = 5) {
    const params = new HttpParams();
    params.append('page', page);
    params.append('size', size);
    params.append('sort', 'fechaCreacion,desc')

    return this.http.get<LibroPage>(`${this.apiBase}/admin/libros`, {params}); //Importo variable
  }
}
