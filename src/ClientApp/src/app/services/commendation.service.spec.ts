import { TestBed } from '@angular/core/testing';

import { CommendationService } from './commendation.service';

describe('CommendationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommendationService = TestBed.get(CommendationService);
    expect(service).toBeTruthy();
  });
});
