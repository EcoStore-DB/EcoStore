import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
[x: string]: any;
  // Datos de ejemplo para categorías
  // Ahora puedes agregar la propiedad 'image' para cada categoría si lo deseas
  categories = [
    { id: 1, name: 'Electrónica', image: 'https://via.placeholder.com/300x200?text=Electrónica' },
    { id: 2, name: 'Ropa', image: 'https://via.placeholder.com/300x200?text=Ropa' },
    { id: 3, name: 'Hogar', image: 'https://via.placeholder.com/300x200?text=Hogar' }
  ];

  // Datos de ejemplo para productos
  products = [
    { id: 1, name: 'Smartphone', categoryId: 1, price: 300, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Laptop', categoryId: 1, price: 1200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Camiseta', categoryId: 2, price: 20, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Sofá', categoryId: 3, price: 450, image: 'https://via.placeholder.com/150' }
  ];

  // Método para obtener productos por categoría
  getProductsByCategory(categoryId: number) {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  // Método para ordenar productos
  orderProducts(event: Event) {
    const order = (event.target as HTMLSelectElement).value;
    if (order === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  // Método para ver detalles de un producto
  viewProduct(product: any) {
    alert(`Producto seleccionado: ${product.name}`);
    // Aquí podrías navegar a una página de detalles o mostrar un modal
  }
}
