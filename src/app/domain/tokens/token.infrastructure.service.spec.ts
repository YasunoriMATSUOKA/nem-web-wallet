import { TestBed } from '@angular/core/testing';

import { TokenInfrastructureService } from './token.infrastructure.service';

describe('TokenInfrastructureService', () => {
  let service: TokenInfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInfrastructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
