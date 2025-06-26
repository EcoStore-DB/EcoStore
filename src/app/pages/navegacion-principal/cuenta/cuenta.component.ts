import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { ApiService } from '../../../service/api.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {
  activeTab: string = 'config';

  productos: { id_producto?: number; nombre: string; precio: number }[] = [];
  nuevoProducto = { nombre: '', precio: null, categoria: '' };
  productosVisibles = 5;

  idBusqueda: number | null = null;
  productoBuscado: any = null;
  busquedaFallida = false;

  ventasPorProducto: any[] = [];

  colorScheme = {
    domain: ['#198754', '#ffc107', '#0dcaf0', '#6610f2', '#d63384', '#fd7e14', '#20c997', '#0d6efd']
  };

  productosPorCategoria: any[] = [];

  categoriasPermitidas: string[] = [
    'Actualizado', 'Hogar', 'Cocina', 'Higiene', 'Moda', 'Oficina', 'Tecnología', 'Salud', 'Limpieza', 'Jardinería', 'Decoración'
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarVentasPorProducto();
  }

  cargarProductos() {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.productos = res;
        this.productosPorCategoria = this.contarPorCategoria(res);
      },
      error: () => {
        this.productos = [];
        this.productosPorCategoria = [];
      }
    });
  }

  contarPorCategoria(productos: any[]): any[] {
    const conteo: { [key: string]: number } = {};
    productos.forEach(p => {
      conteo[p.categoria] = (conteo[p.categoria] || 0) + 1;
    });
    return Object.entries(conteo).map(([name, value]) => ({ name, value }));
  }

  agregarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.precio == null) return;
    this.apiService.create(this.nuevoProducto).subscribe({
      next: () => {
        this.nuevoProducto = { nombre: '', precio: null, categoria: '' };
        this.cargarProductos();
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: 'El producto se agregó correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  actualizarProducto(index: number) {
    const producto = this.productos[index];
    if (!producto.id_producto) return;
    this.apiService.update(producto.id_producto, producto).subscribe({
      next: () => {
        this.cargarProductos();
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'El producto se actualizó correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  eliminarProducto(index: number) {
    const producto = this.productos[index];
    if (!producto.id_producto) return;
    this.apiService.delete(producto.id_producto).subscribe({
      next: () => {
        this.cargarProductos();
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: 'El producto se eliminó correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  cargarMasProductos() {
    this.productosVisibles += 5;
  }

  buscarProductoPorId() {
    this.productoBuscado = null;
    this.busquedaFallida = false;
    if (this.idBusqueda) {
      this.apiService.getById(this.idBusqueda).subscribe({
        next: (res) => {
          this.productoBuscado = res;
          this.busquedaFallida = false;
          Swal.fire({
            icon: 'success',
            title: 'Producto encontrado',
            text: `Producto: ${res.nombre}`,
            timer: 1500,
            showConfirmButton: false
          });
        },
        error: () => {
          this.productoBuscado = null;
          this.busquedaFallida = true;
          Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: 'No se encontró el producto con ese ID.',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    }
  }

  cargarVentasPorProducto() {
    // Aquí usamos los productos cargados para simular ventas por producto (puedes adaptar según tu lógica real)
    this.apiService.getData().subscribe({
      next: (res) => {
        // Ejemplo: cada producto tiene ventas aleatorias (puedes cambiarlo por ventas reales si tienes ese dato)
        this.ventasPorProducto = res.map((p: any) => ({
          name: p.nombre,
          value: Math.floor(Math.random() * 100) + 1 // Simulación de ventas
        }));
      },
      error: () => {
        this.ventasPorProducto = [];
      }
    });
  }
}