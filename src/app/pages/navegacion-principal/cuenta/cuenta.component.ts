import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡Importante para ngModel!

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  activeTab: string = 'config';

  productos: { nombre: string; precio: number }[] = [];

  nuevoProducto = {
    nombre: '',
    precio: null
  };

  agregarProducto() {
    
  }

  actualizarProducto(index: number) {
    alert('Producto actualizado.');
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }
}
