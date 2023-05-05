import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  @Output() emitCloseSession = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSession() {
    this.emitCloseSession.emit();
  }

}
