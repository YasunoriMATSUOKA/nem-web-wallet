import { TestBed } from '@angular/core/testing';

import { TxInfrastructureService } from './transaction.infrastructure.service';

describe('TxInfrastructureService', () => {
  let service: TxInfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxInfrastructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
