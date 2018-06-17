import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateAuthGuard } from './update-auth.guard';

describe('UpdateAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateAuthGuard]
    });
  });

  it('should ...', inject([UpdateAuthGuard], (guard: UpdateAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
