import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly usersService: UsersService,
    private readonly router: Router) {
      this.applicationForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.navigationService.blockBackNavigation();
  }

  async submit() {
    try {
      const {
        username,
        password
      } = this.applicationForm.value;
      const result = await lastValueFrom(this.usersService.login({username, password}));
      if (result.response) {
        console.log('login result > ', result);
        sessionStorage.setItem('isLogin', 'true');
        sessionStorage.setItem('user', JSON.stringify(result.response));
        this.router.navigate(['/application/home']);
      } else {
        Swal.fire({
          title: '¡Algo salió mal!',
          text: 'No se pudo iniciar sesión por favor verifique su usuario y contraseña.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    } catch (error) {
      console.log('login[Error]', error);
      Swal.fire({
        title: '¡Algo salió mal!',
        text: 'No se pudo iniciar sesión',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }
}
