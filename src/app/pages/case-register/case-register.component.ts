import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ISupportType from 'src/app/models/support_type';
import { UtilsService } from 'src/app/services/utils.service';
import { lastValueFrom } from 'rxjs';
import utils from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { CasesService } from 'src/app/services/cases.service';

@Component({
  selector: 'app-case-register',
  templateUrl: './case-register.component.html',
  styleUrls: ['./case-register.component.css']
})
export class CaseRegisterComponent implements OnInit {

  applicationForm: FormGroup;
  public supportTypesList: ISupportType[] = [];
  public userInfo: any;

  constructor(private formBuilder: FormBuilder,
    private readonly utilsService: UtilsService,
    private readonly casesService: CasesService) {
    this.userInfo = utils.getUserInfo();
    this.applicationForm = this.formBuilder.group({
      support_type_id: ['', Validators.required],
      user_id: [this.userInfo ? this.userInfo.id : '', Validators.required], // colocar id de usuario en sesion
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSupportTypes();
  }

  async getSupportTypes() {
    const list = await lastValueFrom(this.utilsService.getSupportTypes());
    this.supportTypesList = list.response;
  }

  public formatText(field: string) {
    const value = this.applicationForm.controls[field].value;
    this.applicationForm.controls[field].setValue(value ? (value as string).toUpperCase() : '');
  }

  async submit() {
    try {
      const newCase = this.applicationForm.value;
      const response = await lastValueFrom(this.casesService.create(newCase));
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
