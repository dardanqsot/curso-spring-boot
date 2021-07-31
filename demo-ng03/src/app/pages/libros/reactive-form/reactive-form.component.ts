import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../interfaces/libro';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styles: [
  ]
})
export class ReactiveFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [,[Validators.required, Validators.minLength(3)]],
      precio: [,[Validators.required]],
      publicado: [true,]//por defecto el valor dentro del corchete
    })
  }

  crear() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const valoresFormulario = this.form.value;
    const libro: Libro = {
      id: new Date().getTime(),
      fechaCreacion: new Date(),
      ...valoresFormulario
      /*Se quita lo siguiente y se reemplaza por ...valores..
      titulo: valoresFormulario.titulo,
      precio: valoresFormulario.precio,
      publicado: valoresFormulario.publicado*/
    }

    this.libroService.crearLibro(libro);
    this.form.reset({
      publicado: true
    })
    
  }

}
