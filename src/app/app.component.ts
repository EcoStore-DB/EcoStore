import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { NavbarHeaderComponent } from './componets/navbar-header/navbar-header.component';
import { BottomBarComponent } from './componets/bottom-bar/bottom-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarHeaderComponent,BottomBarComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

  
})
export class AppComponent {
  
}


