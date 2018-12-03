import { TestBed } from '@angular/core/testing';

import { SwitchTabService } from './switch-tab.service';

describe('SwitchTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwitchTabService = TestBed.get(SwitchTabService);
    expect(service).toBeTruthy();
  });
});
