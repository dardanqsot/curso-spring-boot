import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Libro, LibroPage } from '../../interfaces/libro.interface';
import { Venta } from '../../interfaces/venta.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }


  getUltimosLibros() {
    return this.http.get<Libro[]>(`${this.apiBase}/ultimos-libros`);
  }

  getLibros(page: number = 0, size: number = 6) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', "fechaCreacion,desc");

    return this.http.get<LibroPage>(`${this.apiBase}/libros`, { params })
  }

  getLibro(slug: string) {
    return this.http.get<Libro>(`${this.apiBase}/libros/${slug}`)
  }

  pagar(idLibros: number[]) {
    return this.http.post<Venta>(`${this.apiBase}/pagar-compra`, idLibros);
  }

  getVenta(id: number) {
    return this.http.get<Venta>(`${this.apiBase}/detalles-compra/${id}`);
  }

  descargarArchivo(idItemVenta: number) {
    return this.http.get(`${this.apiBase}/descargar-archivo/${idItemVenta}`, {
      responseType: 'blob'
    });
  }

  registrarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.apiBase}/auth/registro`, usuario);
  }

}
