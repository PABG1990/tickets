import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import ICustomer from 'src/app/models/customer';
import IDocumentType from 'src/app/models/documentType';
import IProfile from 'src/app/models/profile';
import { ISaveUser } from 'src/app/models/save_user';
import { CustomersService } from 'src/app/services/customers.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  applicationForm: FormGroup;
  public customersList: ICustomer[];
  public documentTypesList: IDocumentType[];
  public profilesList: IProfile[];

  constructor(private formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
    private readonly utilsService: UtilsService) {
    this.customersList = [];
    this.documentTypesList = [];
    this.profilesList = [];
    this.applicationForm = this.formBuilder.group({
      customer_id: ['', Validators.required], // colocar id de usuario en sesion
      document_type_id: ['', Validators.required],
      document: ['', Validators.required],
      first_name: ['', Validators.required],
      second_name: [''],
      first_lastname: ['', Validators.required],
      second_lastname: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      profile_id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCustomersList();
    this.getDocumentTypesList();
    this.getProfilesList();
  }

  async getCustomersList() {
    const list = await lastValueFrom(this.customersService.get({register_status: 'ACTIVO'}));
    this.customersList = list.response;
  }

  async getDocumentTypesList() {
    const list = await lastValueFrom(this.utilsService.getDocumentTypes());
    this.documentTypesList = list.response;
  }

  async getProfilesList() {
    const list = await lastValueFrom(this.utilsService.getProfiles());
    this.profilesList = list.response;
  }

  async submit() {
    try {
      const customer = this.applicationForm.value;
      const saveUser: ISaveUser = {
        person: {
          customer_id: customer.customer_id,
          document_type_id: customer.document_type_id,
          document: customer.document,
          first_name: customer.first_name,
          second_name: customer.second_name,
          first_lastname: customer.first_lastname,
          second_lastname: customer.second_lastname,
          phone: customer.phone,
          email: customer.email,
        },
        user: {
          password: customer.password,
          profile_id: customer.profile_id,
          username: customer.username
        }
      }
      const response = await lastValueFrom(this.usersService.create(saveUser));
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

  public formatText(field: string) {
    const value = this.applicationForm.controls[field].value;
    this.applicationForm.controls[field].setValue(value ? (value as string).toUpperCase() : '');

    if (field === 'email') {
      const cadena = (value as string).split('@');
      this.applicationForm.controls['username'].setValue((cadena[0] ? cadena[0] : ''));
    }
  }
}
