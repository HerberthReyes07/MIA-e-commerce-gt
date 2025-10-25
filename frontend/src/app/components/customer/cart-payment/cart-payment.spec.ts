import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPayment } from './cart-payment';

describe('CartPayment', () => {
  let component: CartPayment;
  let fixture: ComponentFixture<CartPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
