import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito = [
    { nombre: 'Producto 1', precio: 25.99, cantidad: 2 },
    { nombre: 'Producto 2', precio: 15.50, cantidad: 1 },
  ];

  get total() {
    return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  eliminarItem(index: number) {
    this.carrito.splice(index, 1);
  }
}
