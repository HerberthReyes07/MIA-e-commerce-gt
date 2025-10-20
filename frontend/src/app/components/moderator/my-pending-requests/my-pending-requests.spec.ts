import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingRequests } from './my-pending-requests';

describe('MyPendingRequests', () => {
  let component: MyPendingRequests;
  let fixture: ComponentFixture<MyPendingRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPendingRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPendingRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
