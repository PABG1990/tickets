import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import ICaseTraceability from 'src/app/models/case_traceability';
import ISupportType from 'src/app/models/support_type';
import { CasesService } from 'src/app/services/cases.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import utils from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit {

  assingForm: FormGroup;
  reScheduleForm: FormGroup;
  observationsForm: FormGroup;

  public supportTypesList: ISupportType[] = [];
  public selectedCase: any;
  public isAssigned: boolean = false;
  public assignedToName: string = '';
  public assignedToEmail: string = '';
  public assignedToDate: string = '';
  public caseTraceability: ICaseTraceability[] = [];
  public showBtnAssign: boolean = false;
  public techniciansList: any[] = [];
  public accessButtons: {
    showAssign: boolean;
    showReschedule: boolean;
    showAddObservations: boolean;
  };

  public showAssignTechnicianForm = false;
  public showRescheduleCase = false;
  public showAddObservations = false;

  public userInfo: any = {};

  constructor(private formBuilder: FormBuilder,
    private readonly casesService: CasesService,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService) {

      this.assingForm = this.formBuilder.group({
        id: [''],
        technician_id: ['', Validators.required],
        scheduled_date: ['', Validators.required]
      });

      this.reScheduleForm = this.formBuilder.group({
        id: [''],
        scheduled_date: ['', Validators.required]
      });

      this.observationsForm = this.formBuilder.group({
        case_id: [''],
        observations: ['', Validators.required],
        created_by: ['']
      });

      this.userInfo = utils.getUserInfo();
      this.accessButtons = utils.getAccessButtons(this.userInfo.profile.name);
      console.log('accessButtons: ', this.accessButtons);
  }

  ngOnInit(): void {
    this.getSupportTypes();
    this.getCaseInfo();
    this.getTechnicians();
  }

  async getSupportTypes() {
    const list = await lastValueFrom(this.utilsService.getSupportTypes());
    this.supportTypesList = list.response;
  }

  getCaseInfo() {
    this.selectedCase = JSON.parse(sessionStorage.getItem('selectedCase') || '{}');
    this.isAssigned = this.selectedCase.technician_id !== null;
    if (this.isAssigned) {
      const tech = this.selectedCase.technician.person;
      this.assignedToName = `${tech.first_name} ${tech.first_lastname}`;
      this.assignedToEmail = tech.email;
      this.assignedToDate = this.selectedCase.scheduled_date;
      this.caseTraceability = this.selectedCase.caseTraceability;
    }
  }

  async getTechnicians() {
    this.techniciansList = (await lastValueFrom(this.usersService.get({profile_id: 2, register_status: 'ACTIVO'}))).response;
  }

  showForm(form: string) {
    if (form === 'assignTechnician') {
      this.showAssignTechnicianForm = !this.showAssignTechnicianForm;
    }

    if (form === 'reScheduleCase') {
      this.showRescheduleCase = !this.showRescheduleCase;
    }

    if (form === 'addObservations') {
      this.showAddObservations = !this.showAddObservations;
    }
  }

  public formatText(field: string) {
    const value = this.observationsForm.controls[field].value;
    this.observationsForm.controls[field].setValue(value ? (value as string).toUpperCase() : '');
  }

  async assingCase() {
    try {
      this.assingForm.controls['id'].setValue(this.selectedCase.id);
      const updateCase = {
        ...this.assingForm.value,
        case_status: 'AGENDADO'
      }
      await lastValueFrom(this.casesService.updateCase(updateCase));
      Swal.fire({
        title: '¡Asignación exitosa!',
        text: 'El caso ha sido agendado correctamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.assingForm.reset();
        }
      })
    } catch (error) {
      console.log('assingCase[Error]', error);
      Swal.fire({
        title: '¡Algo salió mal!',
        text: 'No se pudo realizar la asignación del caso',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  async reScheduleCase() {
    try {
      this.reScheduleForm.controls['id'].setValue(this.selectedCase.id);
      const updateCase = {
        ...this.reScheduleForm.value,
        case_status: 'REAGENDADO'
      }
      console.log('reScheduleCase().updateCase', updateCase);
      await lastValueFrom(this.casesService.updateCase(updateCase));
      Swal.fire({
        title: '¡Reagadamiento exitoso!',
        text: 'El caso ha sido reagendado correctamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.reScheduleForm.reset();
        }
      })
    } catch (error) {
      console.log('reScheduleCase[Error]', error);
      Swal.fire({
        title: '¡Algo salió mal!',
        text: 'No se pudo realizar el reagendamiento del caso',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  async addObservations() {
    try {
      this.observationsForm.controls['case_id'].setValue(this.selectedCase.id);
      this.observationsForm.controls['created_by'].setValue(this.userInfo.id);
      await lastValueFrom(this.casesService.addTraceability(this.observationsForm.value));
      Swal.fire({
        title: '¡Registro de observación exitoso!',
        text: 'Se ha registrado la observación sobre el caso correctamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.observationsForm.reset();
        }
      })
    } catch (error) {
      console.log('addObservations[Error]', error);
      Swal.fire({
        title: '¡Algo salió mal!',
        text: 'No se pudo realizar el registro de observación sobre el caso',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  finalizeCase() {
    Swal.fire({
      title: '¿Desea finalizar el soporte?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, finalizar soporte',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateCase = {
          id: this.selectedCase.id,
          case_status: 'FINALIZADO'
        }
        await lastValueFrom(this.casesService.updateCase(updateCase));
        Swal.fire({
          title: '¡Caso finalizado!',
          text: 'Has finalizado el caso correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        })
      }
    })
  }

}
