import { TestBed } from '@angular/core/testing';

import { PathResolverService } from './path-resolve.service';

describe('PathResolverService', () => {
  let service: PathResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
