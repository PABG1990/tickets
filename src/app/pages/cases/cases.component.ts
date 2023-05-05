import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CasesService } from 'src/app/services/cases.service';
import utils from 'src/app/utils/utils';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  public casesList: any[];
  public userInfo: any = {};

  constructor(private readonly casesService: CasesService,
    private router: Router) {
    this.casesList = [];
    this.userInfo = utils.getUserInfo();
  }

  ngOnInit(): void {
    this.getCasesList();
  }

  async getCasesList() {
    let where = {}
    if (this.userInfo.profile.name === 'TECNICO') {
      where = {
        technician_id: this.userInfo.id
      }
    }

    if (this.userInfo.profile.name === 'CLIENTE') {
      where = {
        user_id: this.userInfo.id
      }
    }

    const list = await lastValueFrom(this.casesService.get(where));
    this.casesList = list.response;
  }

  viewCase(id: number) {
    const selectedCase = this.casesList.find((item) => item.id === id);
    sessionStorage.setItem('selectedCase', JSON.stringify(selectedCase));
    this.router.navigate(['application/case-view']);
  }

  getStatusColor(status: string) {
    return utils.getCaseColor(status);
  }
}
