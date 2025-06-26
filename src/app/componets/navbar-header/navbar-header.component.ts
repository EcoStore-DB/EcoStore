import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css']
})
export class NavbarHeaderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  suggestions: any[] = [];
  carritoCantidad: number = 0;
  inputFocused = false;

  private handleClickOutsideBound: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.actualizarCantidadCarrito();
    window.addEventListener('storage', () => this.actualizarCantidadCarrito());
    this.handleClickOutsideBound = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.handleClickOutsideBound);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutsideBound);
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar-search-container')) {
      this.suggestions = [];
    }
  }

  actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.carritoCantidad = carrito.reduce((sum: number, item: any) => sum + (item.cantidad || 1), 0);
  }

  onInputChange() {
    if (this.searchTerm.trim().length > 0) {
      this.api.search(this.searchTerm.trim()).subscribe(res => {
        this.suggestions = res.slice(0, 5);
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(product: any) {
    this.suggestions = [];
    this.searchTerm = '';
    this.router.navigate(['/productos', product.id_producto]);
  }

  onSearch() {
    this.suggestions = [];
    if (this.searchTerm.trim().length > 0) {
      this.router.navigate(['/productos'], { queryParams: { q: this.searchTerm } });
    }
  }

  onInputBlur() {
    // Espera un poco para permitir el click en la sugerencia antes de ocultar
    setTimeout(() => {
      this.inputFocused = false;
      this.suggestions = [];
    }, 200);
  }
}
