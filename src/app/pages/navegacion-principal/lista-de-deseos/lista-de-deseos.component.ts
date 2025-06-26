import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { routes } from '../../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-de-deseos',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './lista-de-deseos.component.html',
  styleUrls: ['./lista-de-deseos.component.css']
})
export class ListaDeDeseosComponent implements OnInit {
  listaDeseos: any[] = [];

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista() {
    this.listaDeseos = JSON.parse(localStorage.getItem('listaDeseos') || '[]');
  }

  eliminarDeDeseos(index: number) {
    const nombre = this.listaDeseos[index]?.nombre;
    this.listaDeseos.splice(index, 1);
    localStorage.setItem('listaDeseos', JSON.stringify(this.listaDeseos));
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `Producto "${nombre}" eliminado de tu lista de deseos.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
}
