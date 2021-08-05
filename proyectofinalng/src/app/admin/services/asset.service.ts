import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private apiBase = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }


    subirArchivo(form: FormData) {
      return this.http.post(`${this.apiBase}/assets/upload`, form);
    }

}
