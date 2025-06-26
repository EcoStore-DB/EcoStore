import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent {
  entregas = [
    { numero: '#12345', estado: 'En tránsito', fecha: '15/06/2025' },
    { numero: '#12346', estado: 'Entregado', fecha: '12/06/2025' }
  ];
}
