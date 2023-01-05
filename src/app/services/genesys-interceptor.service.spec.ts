import { TestBed } from '@angular/core/testing';

import { GenesysInterceptorService } from './genesys-interceptor.service';

describe('GenesysInterceptorService', () => {
  let service: GenesysInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenesysInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
