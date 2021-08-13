import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { Venta, ItemVenta } from '../../../interfaces/venta.interface';

@Component({
  selector: 'app-detalles-compra',
  templateUrl: './detalles-compra.component.html',
  styles: [
  ]
})
export class DetallesCompraComponent implements OnInit {
  venta!: Venta

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idVenta = parseInt(this.route.snapshot.paramMap.get('idVenta')!);

    this.homeService.getVenta(idVenta)
      .subscribe(venta => {
        this.venta = venta;
      })
  }

  descargarArchivo(itemVenta: ItemVenta) {
    this.homeService.descargarArchivo(itemVenta.id)
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `${itemVenta.libro.titulo}.pdf`;
        a.click();

        URL.revokeObjectURL(objectUrl);

        itemVenta.numeroDescargasDisponibles--;
      })
  }

}
