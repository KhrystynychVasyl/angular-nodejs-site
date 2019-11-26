import { TestBed } from '@angular/core/testing';

import { BuyCartListService } from './buy-cart-list.service';

describe('BuyCartListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyCartListService = TestBed.get(BuyCartListService);
    expect(service).toBeTruthy();
  });
});
