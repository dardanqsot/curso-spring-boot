import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { AssetService } from '../../services/asset.service';
import { Router } from '@angular/router';
import { Libro } from '../../../interfaces/libro.interface';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styles: [
  ]
})
export class NuevoLibroComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  crear(libro: Libro) {
    this.libroService.crearLibro(libro)
      .subscribe(data => this.router.navigate(['/admin', 'libros']));
  }

}
