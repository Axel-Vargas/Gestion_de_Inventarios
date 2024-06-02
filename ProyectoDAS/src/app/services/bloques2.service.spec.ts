import { TestBed } from '@angular/core/testing';

import { Bloques2Service } from './bloques2.service';

describe('Bloques2Service', () => {
  let service: Bloques2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bloques2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
