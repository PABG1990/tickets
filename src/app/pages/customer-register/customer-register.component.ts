import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import ICustomer from 'src/app/models/customer';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  applicationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private customerService: CustomersService) {
    this.applicationForm = this.formBuilder.group({
      nit: ['', Validators.required],
      verification_code: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Todo:
    // Validar variable para saber si guardar o actualizar
  }

  async submit() {
    try {
      const customer: ICustomer = this.applicationForm.value;
      const response = await lastValueFrom(this.customerService.save(customer, 'create'));
      Swal.fire({
        title: '¡Registro exitoso!',
        text: response.message,
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.applicationForm.reset();
        }
      })
    } catch (error) {
      console.log('submit[Error]', error);
      Swal.fire({
        title: '¡Algo salió mal!',
        text: 'No se pudo realizar el registro',
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
