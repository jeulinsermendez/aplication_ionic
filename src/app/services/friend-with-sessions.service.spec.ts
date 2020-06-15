import { TestBed } from '@angular/core/testing';

import { FriendWithSessionsService } from './friend-with-sessions.service';

describe('FriendWithSessionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendWithSessionsService = TestBed.get(FriendWithSessionsService);
    expect(service).toBeTruthy();
  });
});
