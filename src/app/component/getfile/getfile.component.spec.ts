import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetfileComponent } from './getfile.component';

describe('GetfileComponent', () => {
  let component: GetfileComponent;
  let fixture: ComponentFixture<GetfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
