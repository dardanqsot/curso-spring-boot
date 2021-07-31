import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { ReactiveFormComponent } from './pages/libros/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './pages/libros/template-form/template-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LibrosComponent,
    ReactiveFormComponent,
    TemplateFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
