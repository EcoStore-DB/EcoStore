import { Routes } from '@angular/router';
import { HomeComponent } from './pages/navegacion-principal/home/home.component';
import { ProductoComponent } from './pages/navegacion-principal/producto/producto.component';
import { EntregasComponent } from './pages/navegacion-principal/entregas/entregas.component';
import { CuentaComponent } from './pages/navegacion-principal/cuenta/cuenta.component';
import { CarritoComponent } from './pages/navegacion-principal/carrito/carrito.component';
import { LoginRegisterComponent } from './pages/navegacion-principal/login-register/login-register.component';
import { ListaDeDeseosComponent } from './pages/navegacion-principal/lista-de-deseos/lista-de-deseos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'entregas', component: EntregasComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'lista', component: ListaDeDeseosComponent },
  { path: 'productos/:id', component: ProductoComponent },
];
