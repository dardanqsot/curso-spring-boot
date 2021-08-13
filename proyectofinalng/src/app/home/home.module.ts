import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LibroComponent } from './pages/libro/libro.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { DetallesCompraComponent } from './pages/detalles-compra/detalles-compra.component';



@NgModule({
  declarations: [
    LayoutComponent,
    IndexComponent,
    LibrosComponent,
    LibroComponent,
    CarritoComponent,
    DetallesCompraComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }
