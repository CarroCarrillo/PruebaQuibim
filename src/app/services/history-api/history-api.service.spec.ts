import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HistoryApiService } from './history-api.service';

describe('HistoryApiService', () => {
  let service: HistoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HistoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
