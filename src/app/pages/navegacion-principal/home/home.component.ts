import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = []; // todos los productos traídos del backend
  visibleProducts: any[] = []; // productos actualmente visibles
  productsPerPage = 8; // cantidad de productos a mostrar por página
  currentPage = 1;
  endOfList = false;

  categories = [
    { id: 1, name: 'Electrónica' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Hogar' }
  ];

  order: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getData().subscribe({
      next: (res) => {
        this.data = res;
        this.sortProducts();
        this.currentPage = 1;
        this.endOfList = false;
        this.visibleProducts = this.data.slice(0, this.productsPerPage);
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  getProductsByCategory(categoryId: number): any[] {
    return this.data.filter(product => product.categoryId === categoryId);
  }

  orderProducts(event: Event): void {
    const orderValue = (event.target as HTMLSelectElement).value;
    this.order = orderValue === 'asc' ? 'asc' : 'desc';
    this.sortProducts();
    this.currentPage = 1;
    this.endOfList = false;
    this.visibleProducts = this.data.slice(0, this.productsPerPage);
  }

  sortProducts(): void {
    this.data.sort((a, b) => {
      if (this.order === 'asc') {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });
  }

  loadMore(): void {
    const nextPage = this.currentPage + 1;
    const start = (nextPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    const moreProducts = this.data.slice(start, end);
    if (moreProducts.length > 0) {
      this.visibleProducts = this.visibleProducts.concat(moreProducts);
      this.currentPage = nextPage;
      if (this.visibleProducts.length >= this.data.length) {
        this.endOfList = true;
      }
    } else {
      this.endOfList = true;
    }
  }

  viewProduct(product: any): void {
    alert(`Producto seleccionado: ${product.name}`);
  }

  agregarListaDeseos(product: any): void {
    const lista = JSON.parse(localStorage.getItem('listaDeseos') || '[]');
    const existe = lista.find((item: any) => item.nombre === product.nombre);
    if (!existe) {
      lista.push(product);
      localStorage.setItem('listaDeseos', JSON.stringify(lista));
      Swal.fire({
        icon: 'success',
        title: '¡Agregado!',
        text: `Producto "${product.nombre}" agregado a tu lista de deseos.`,
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Ya está en tu lista',
        text: `El producto "${product.nombre}" ya está en tu lista de deseos.`,
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  agregarAlCarrito(product: any): void {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const index = carrito.findIndex((item: any) => item.nombre === product.nombre);

    if (index > -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire({
      icon: 'success',
      title: '¡Agregado!',
      text: `Producto "${product.nombre}" agregado al carrito.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
