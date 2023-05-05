import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  @Output() emitCloseSession = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSession() {
    this.emitCloseSession.emit();
  }

}
