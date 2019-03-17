import { TestBed } from '@angular/core/testing';

import { NgTdvService } from './ng-tdv.service';

describe('NgTdvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTdvService = TestBed.get(NgTdvService);
    expect(service).toBeTruthy();
  });
});
