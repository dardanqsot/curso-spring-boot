import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [
  ]
})
export class LibrosComponent implements OnInit {

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
  }

  get libros() {
    return this.libroService.libros;
  }
}
