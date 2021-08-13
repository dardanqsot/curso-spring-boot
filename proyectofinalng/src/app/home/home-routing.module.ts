import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { IndexComponent } from './pages/index/index.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { LibroComponent } from './pages/libro/libro.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { DetallesCompraComponent } from './pages/detalles-compra/detalles-compra.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            component: IndexComponent
          },
          {
            path: 'libros',
            component: LibrosComponent
          },
          {
            path: 'libro/:slug',
            component: LibroComponent
          },
          {
            path: 'carrito',
            component: CarritoComponent
          },
          {
            path: 'detalles-compra/:idVenta',
            component: DetallesCompraComponent
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }