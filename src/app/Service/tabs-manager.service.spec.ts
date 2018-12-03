import { TestBed } from '@angular/core/testing';

import { TabsManagerService } from './tabs-manager.service';

describe('TabsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabsManagerService = TestBed.get(TabsManagerService);
    expect(service).toBeTruthy();
  });
});
