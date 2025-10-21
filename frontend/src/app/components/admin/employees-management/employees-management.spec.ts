import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesManagement } from './employees-management';

describe('EmployeesManagement', () => {
  let component: EmployeesManagement;
  let fixture: ComponentFixture<EmployeesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
