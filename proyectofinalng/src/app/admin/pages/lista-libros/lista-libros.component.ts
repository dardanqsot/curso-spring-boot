import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LibroPage } from 'src/app/interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../../interfaces/libro.interface';
import { Router } from '@angular/router';

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
    private libroService: LibroService,
    private router: Router
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

  eliminarLibro(libro: Libro) {
    const ok = confirm('¿Está seguro de eliminar este libro?');

    if (ok) {
      this.libroService.eliminarLibro(libro)
        .subscribe(() => {

          this.libroService.getLibros()
            .subscribe(data => this.libroPage = data);
            
        });
    }
  }

  editarLibro(libro: Libro) {
    this.router.navigate(['/admin', 'libros', libro.id, 'editar']);
  }

}
