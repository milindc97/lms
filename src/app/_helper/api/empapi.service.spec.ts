import { TestBed } from '@angular/core/testing';

import { EmpapiService } from './empapi.service';

describe('EmpapiService', () => {
  let service: EmpapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
