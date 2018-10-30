import { TestBed } from '@angular/core/testing';

import { SpaceShipService } from './space-ship.service';

describe('SpaceShipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceShipService = TestBed.get(SpaceShipService);
    expect(service).toBeTruthy();
  });
});
