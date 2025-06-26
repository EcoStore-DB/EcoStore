import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  resumenCarrito: any[] = [];
  pagano = false;
  pagoExitoso = false;

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  get total() {
    return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  get totalResumen() {
    return this.resumenCarrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  procederPago() {
    this.resumenCarrito = JSON.parse(JSON.stringify(this.carrito)); // copia profunda
    this.pagano = true;
    this.pagoExitoso = false;
  }

  finalizarPago() {
    Swal.fire({
      icon: 'success',
      title: '¡Pago realizado!',
      text: 'Gracias por tu compra.',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true
    }).then(() => {
      this.pagoExitoso = true;
      this.carrito = [];
      localStorage.removeItem('carrito');
      setTimeout(() => {
        this.pagano = false;
        this.pagoExitoso = false;
        this.resumenCarrito = [];
        this.cargarCarrito(); // Para refrescar el carrito en pantalla
      }, 2500);
    });
  }

  volverAlCarrito() {
    this.pagano = false;
    this.pagoExitoso = false;
    this.resumenCarrito = [];
  }

  cambiarCantidad(index: number, cambio: number): void {
    if (!this.carrito || !this.carrito[index]) return;
    const nuevaCantidad = this.carrito[index].cantidad + cambio;
    if (nuevaCantidad >= 1) {
      this.carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      window.dispatchEvent(new Event('storage'));
      Swal.fire({
        icon: 'success',
        title: 'Cantidad actualizada',
        text: `Cantidad de "${this.carrito[index].nombre}" actualizada.`,
        timer: 1000,
        showConfirmButton: false
      });
    }
  }

  eliminarItem(index: number): void {
    if (!this.carrito || !this.carrito[index]) return;
    const nombre = this.carrito[index]?.nombre;
    this.carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    window.dispatchEvent(new Event('storage'));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `Producto "${nombre}" eliminado del carrito.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
