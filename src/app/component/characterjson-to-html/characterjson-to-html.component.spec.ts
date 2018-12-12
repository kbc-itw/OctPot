import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterjsonToHtmlComponent } from './characterjson-to-html.component';

describe('CharacterjsonToHtmlComponent', () => {
  let component: CharacterjsonToHtmlComponent;
  let fixture: ComponentFixture<CharacterjsonToHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterjsonToHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterjsonToHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
