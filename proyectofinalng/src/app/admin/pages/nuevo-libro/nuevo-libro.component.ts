import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-nuevo-libro',
  templateUrl: './nuevo-libro.component.html',
  styles: [
  ]
})
export class NuevoLibroComponent implements OnInit {
  urlPortada?: string;


  formulario = this.fb.group({
    titulo: [,[Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    slug: [, [Validators.required, Validators.maxLength(250)]],
    precio: [, [Validators.required, Validators.min(1)]],
    descripcion: [, [Validators.required]],
    rutaPortada: [, [Validators.required]],
    rutaArchivo: [, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private assetService: AssetService
  ) { }

  ngOnInit(): void {
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

  crear() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.libroService.crearLibro(this.formulario.value)
      .subscribe(data => console.log('libro', data));
  }

}
