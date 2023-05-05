import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CasesService } from 'src/app/services/cases.service';
import utils from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public graphOptions: any;
  public userInfo: any;
  public whereCondition: string = '';

  constructor(private readonly casesService: CasesService) {
    this.userInfo = utils.getUserInfo();
    const profileName = this.userInfo.profile.name;
    if (profileName === 'ADMINISTRADOR') {
      this.whereCondition = 'id > 0';
    }
    if (profileName === 'TECNICO') {
      this.whereCondition = `technician_id = ${this.userInfo.id}`;
    }
    if (profileName === 'CLIENTE') {
      this.whereCondition = `user_id = ${this.userInfo.id}`;
    }
  }

  async ngOnInit() {
    const cases = await lastValueFrom(this.casesService.getByStatus(this.whereCondition));
    const dataSeries: any[] = [];
    cases.response.forEach((item) => {
      dataSeries.push([`${item.case_status}`, item.amount]);
    });
    this.graphOptions = {
      series: [
        {
          name: 'Solicitudes de soporte',
          data: dataSeries,
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#000000',
            align: 'center',
            format: '{point.y:,.0f}', // one decimal
            y: 0, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
          }
        }
      ],
      chart: {
        type: 'column',
      },
      title: {
        text: 'Solicitudes de soporte',
      },
      xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Número'
          }
      },
    };
  }

}
