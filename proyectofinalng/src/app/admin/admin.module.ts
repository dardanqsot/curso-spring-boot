import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListaLibrosComponent } from './pages/lista-libros/lista-libros.component';



@NgModule({
  declarations: [
    LayoutComponent,
    ListaLibrosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
