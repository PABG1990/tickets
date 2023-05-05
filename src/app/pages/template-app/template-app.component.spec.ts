import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAppComponent } from './template-app.component';

describe('TemplateAppComponent', () => {
  let component: TemplateAppComponent;
  let fixture: ComponentFixture<TemplateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
