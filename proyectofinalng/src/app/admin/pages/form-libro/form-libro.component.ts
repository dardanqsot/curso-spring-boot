import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Libro } from '../../../interfaces/libro.interface';
import { LibroService } from '../../services/libro.service';
import { AssetService } from '../../services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html',
  styleUrls: [

  ]
})
export class FormLibroComponent implements OnInit {

  urlPortada?: string;

  formulario!: FormGroup;

  @Input() libro?: Libro;

  @Output() onGuardar: EventEmitter<Libro> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
  ) { }

  ngOnInit(): void {
    if (this.libro) {
      this.formulario = this.fb.group({
        titulo: [this.libro?.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
        slug: [this.libro?.slug, [Validators.required, Validators.maxLength(250)]],
        precio: [this.libro?.precio, [Validators.required, Validators.min(1)]],
        descripcion: [this.libro?.descripcion, [Validators.required]],
        rutaPortada: [this.libro?.rutaPortada, [Validators.required]],
        rutaArchivo: [this.libro?.rutaArchivo, [Validators.required]]
      })
  
      this.urlPortada = this.libro?.urlPortada;
    } else {
      this.formulario = this.fb.group({
        titulo: [, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
        slug: [, [Validators.required, Validators.maxLength(250)]],
        precio: [, [Validators.required, Validators.min(1)]],
        descripcion: [, [Validators.required]],
        rutaPortada: [, [Validators.required]],
        rutaArchivo: [, [Validators.required]]
      })
    }
  }


  onFileSelected(event: any, nombrePropiedad: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.assetService.subirArchivo(formData)
        .subscribe((asset: any) => {
          this.formulario.controls[nombrePropiedad].setValue(asset.ruta);

          if (nombrePropiedad === 'rutaPortada') {
            this.urlPortada = asset.url;
          }

        })

    }
  }

  onChangeTitulo() {
    const slug = this.formulario.controls['titulo'].value.toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');

    this.formulario.controls['slug'].setValue(slug);
  }

  guardar() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.onGuardar.emit(this.formulario.value);

  }

}
