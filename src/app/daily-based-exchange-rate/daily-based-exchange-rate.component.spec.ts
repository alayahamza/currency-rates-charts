import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBasedExchangeRateComponent } from './daily-based-exchange-rate.component';

describe('DailyBasedExchangeRateComponent', () => {
  let component: DailyBasedExchangeRateComponent;
  let fixture: ComponentFixture<DailyBasedExchangeRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBasedExchangeRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBasedExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
