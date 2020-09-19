import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSubscriptionComponent } from './report-subscription.component';

describe('ReportSubscriptionComponent', () => {
  let component: ReportSubscriptionComponent;
  let fixture: ComponentFixture<ReportSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
