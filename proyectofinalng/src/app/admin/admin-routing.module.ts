import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListaLibrosComponent } from './pages/lista-libros/lista-libros.component';
import { NuevoLibroComponent } from './pages/nuevo-libro/nuevo-libro.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'libros',
                component: ListaLibrosComponent
            },
            {
                path: 'libros/nuevo',
                component: NuevoLibroComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }