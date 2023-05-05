import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import ICustomer from '../../models/customer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public customersList: ICustomer[];

  constructor(private readonly customersService: CustomersService) {
    this.customersList = [];
  }

  ngOnInit(): void {
    this.getCustomersList();
  }

  async getCustomersList() {
    const list = await lastValueFrom(this.customersService.get());
    this.customersList = list.response;
  }

}
