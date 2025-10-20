import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequestDialog } from './reject-request-dialog';

describe('RejectRequestDialog', () => {
  let component: RejectRequestDialog;
  let fixture: ComponentFixture<RejectRequestDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectRequestDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectRequestDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
