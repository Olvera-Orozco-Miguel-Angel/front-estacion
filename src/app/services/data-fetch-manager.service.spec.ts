import { TestBed } from '@angular/core/testing';

import { DataFetchManagerService } from './data-fetch-manager.service';

describe('DataFetchManagerService', () => {
  let service: DataFetchManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFetchManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
