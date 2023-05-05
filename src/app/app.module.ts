import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CasesComponent } from './pages/cases/cases.component';
import { CaseRegisterComponent } from './pages/case-register/case-register.component';
import { UsersComponent } from './pages/users/users.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerRegisterComponent } from './pages/customer-register/customer-register.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateAppComponent } from './pages/template-app/template-app.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseViewComponent } from './pages/case-view/case-view.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuTechnicianComponent } from './components/menu-technician/menu-technician.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
import { GraphComponent } from './components/graph/graph.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CasesComponent,
    CaseRegisterComponent,
    UsersComponent,
    UserRegisterComponent,
    CustomersComponent,
    CustomerRegisterComponent,
    LoginComponent,
    TemplateAppComponent,
    NavigationMenuComponent,
    CaseViewComponent,
    MenuAdminComponent,
    MenuTechnicianComponent,
    MenuUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GraphComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-Es'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
