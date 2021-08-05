import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LibroPage } from 'src/app/interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';

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

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    console.log('var', pageIndex, pageSize)

    this.libroService.getLibros(pageIndex, pageSize)
      .subscribe(data => this.libroPage = data);
  }

}
