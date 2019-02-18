import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharaAbilityComponent } from './chara-ability.component';

describe('CharaAbilityComponent', () => {
  let component: CharaAbilityComponent;
  let fixture: ComponentFixture<CharaAbilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharaAbilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharaAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
