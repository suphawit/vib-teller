import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerProfileComponent } from './teller-profile.component';

describe('TellerProfileComponent', () => {
  let component: TellerProfileComponent;
  let fixture: ComponentFixture<TellerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
