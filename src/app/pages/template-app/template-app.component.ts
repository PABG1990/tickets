import { Component, OnInit } from '@angular/core';
import utils from 'src/app/utils/utils';

@Component({
  selector: 'app-template-app',
  templateUrl: './template-app.component.html',
  styleUrls: ['./template-app.component.css']
})
export class TemplateAppComponent implements OnInit {

  public userInfo: any;
  public fullName: string = '';
  public profile: string = '';
  public customer: string = '';

  constructor() {
    this.userInfo = utils.getUserInfo();
    if (this.userInfo) {
      const person = this.userInfo.person;
      this.fullName = `${person.first_name} ${person.first_lastname}`;
      this.customer = person.customer.name;
      this.profile = this.userInfo.profile.name;
    }
  }

  ngOnInit(): void {
  }

}
