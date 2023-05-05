import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CasesComponent } from './pages/cases/cases.component';
import { CaseRegisterComponent } from './pages/case-register/case-register.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerRegisterComponent } from './pages/customer-register/customer-register.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateAppComponent } from './pages/template-app/template-app.component';
import { CaseViewComponent } from './pages/case-view/case-view.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'application',
    component: TemplateAppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'cases',
        component: CasesComponent,
      },
      {
        path: 'case-register',
        component: CaseRegisterComponent
      },
      {
        path: 'case-view',
        component: CaseViewComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customer-register',
        component: CustomerRegisterComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user-register',
        component: UserRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
