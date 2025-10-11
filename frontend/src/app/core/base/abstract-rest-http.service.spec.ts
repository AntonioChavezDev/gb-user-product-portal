import { TestBed } from '@angular/core/testing';

import { AbstractRestHttpService } from './abstract-rest-http.service';

describe('AbstractRestHttpService', () => {
  let service: AbstractRestHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractRestHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
