import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-register',
    imports: [CommonModule,RouterModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
 
  isLogin = true;

  @ViewChild('loginEmailInput') loginEmailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('registerNameInput') registerNameInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.setFocus();
  }

  toggleForm() {
    this.isLogin = !this.isLogin;

    // Usa setTimeout para esperar que el DOM actualice el formulario
    setTimeout(() => this.setFocus(), 0);
  }

  private setFocus() {
    if(this.isLogin) {
      this.loginEmailInput?.nativeElement.focus();
    } else {
      this.registerNameInput?.nativeElement.focus();
    }
  }
}
