import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharaSheetComponent } from './chara-sheet.component';

describe('CharaSheetComponent', () => {
  let component: CharaSheetComponent;
  let fixture: ComponentFixture<CharaSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharaSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharaSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
