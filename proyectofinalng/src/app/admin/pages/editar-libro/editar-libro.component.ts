import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { AssetService } from '../../services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../../../interfaces/libro.interface';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: [
  ]
})
export class EditarLibroComponent implements OnInit {

  libro?: Libro

  constructor(
    private libroService: LibroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.libroService.getLibro(id)
      .subscribe((data: any) => {
        this.libro = data;
      });
  }



  actualizar(libro: Libro) {
    this.libroService.actualizarLibro(this.libro!.id, libro)
      .subscribe(data => this.router.navigate(['/admin', 'libros']));
  }

}
