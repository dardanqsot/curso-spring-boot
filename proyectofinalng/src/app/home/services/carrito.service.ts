import { Injectable } from '@angular/core';
import { Libro } from '../../interfaces/libro.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private _items: Libro[] = [];

  constructor() {
    this._items = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  get items() {
    return this._items;
  }

  agregarItem(libro: Libro) {
    this._items.push(libro);
    localStorage.setItem('carrito', JSON.stringify(this._items));
  }

  removerItem(libro: Libro) {
    this._items = this._items.filter(item => item.id !== libro.id);
    localStorage.setItem('carrito', JSON.stringify(this._items));
  }

  removerItems() {
    this._items.forEach(item => this.removerItem(item));
  }

  itemYaExiste(libro: Libro) {
    return this._items.findIndex(l => l.id === libro.id) >= 0;
  }
  
}
