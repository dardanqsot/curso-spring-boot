import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { LibroPage } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styles: [
  ]
})
export class ListaLibrosComponent implements OnInit {

  columnas = ['portada', 'titulo', 'precio', 'fechaCreacion', 'acciones'];
  libroPage!: LibroPage;

  constructor(
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.libroService.getLibros()
      .subscribe(data => this.libroPage = data);
  }

}
