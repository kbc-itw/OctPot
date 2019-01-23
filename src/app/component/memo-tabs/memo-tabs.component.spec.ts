import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoTabsComponent } from './memo-tabs.component';

describe('MemoTabsComponent', () => {
  let component: MemoTabsComponent;
  let fixture: ComponentFixture<MemoTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
