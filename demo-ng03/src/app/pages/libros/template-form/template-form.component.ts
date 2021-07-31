import { Component, OnInit } from '@angular/core';
import { LibrosComponent } from '../libros.component';
import { LibroService } from '../../../services/libro.service';
import { formatCurrency } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Libro } from '../../../interfaces/libro';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styles: [
  ]
})
export class TemplateFormComponent implements OnInit {

  libro: Libro= {
    publicado:true
  }
  
  constructor(
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
  }

  crear(form: NgForm){
    if(form.invalid) {
      form.form.markAllAsTouched();
      return;
    }


  const _libro : Libro = {
    id: new Date().getTime(),
    fechaCreacion : new Date(),
    ...this.libro
  }

  this.libroService.crearLibro(_libro);
  form.resetForm({
    publicado: true
  })

}
}
