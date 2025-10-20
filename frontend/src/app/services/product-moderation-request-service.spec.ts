import { TestBed } from '@angular/core/testing';

import { ProductModerationRequestService } from './product-moderation-request-service';

describe('ProductModerationRequestService', () => {
  let service: ProductModerationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductModerationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
