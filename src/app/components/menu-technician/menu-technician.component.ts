import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-technician',
  templateUrl: './menu-technician.component.html',
  styleUrls: ['./menu-technician.component.css']
})
export class MenuTechnicianComponent implements OnInit {

  @Output() emitCloseSession = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSession() {
    this.emitCloseSession.emit();
  }

}
