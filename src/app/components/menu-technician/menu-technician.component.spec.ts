import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTechnicianComponent } from './menu-technician.component';

describe('MenuTechnicianComponent', () => {
  let component: MenuTechnicianComponent;
  let fixture: ComponentFixture<MenuTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTechnicianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
