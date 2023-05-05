import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersList: any[];

  constructor(private readonly usersService: UsersService) {
    this.usersList = [];
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  async getUsersList() {
    const list = await lastValueFrom(this.usersService.get());
    this.usersList = list.response;
  }
}
