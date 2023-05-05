import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import utils from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  public userInfo: any = {};
  public showAdminMenu = false;
  public showTechnicianMenu = false;
  public showUserMenu = false;

  constructor(private router: Router) {
      this.userInfo = utils.getUserInfo();
    }

  ngOnInit(): void {
    this.showNavigationMenu();
  }

  showNavigationMenu() {
    if (this.userInfo.profile.name === 'ADMINISTRADOR') {
      this.showAdminMenu = true;
      this.showTechnicianMenu = false;
      this.showUserMenu = false;
    }

    if (this.userInfo.profile.name === 'TECNICO') {
      this.showAdminMenu = false;
      this.showTechnicianMenu = true;
      this.showUserMenu = false;
    }

    if (this.userInfo.profile.name === 'CLIENTE') {
      this.showAdminMenu = false;
      this.showTechnicianMenu = false;
      this.showUserMenu = true;
    }
  }

  closeSession() {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        history.pushState(null, '');
        this.router.navigate(['/login']);
      }
    })
  }
}
