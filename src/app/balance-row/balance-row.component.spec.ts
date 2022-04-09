import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRowComponent } from './balance-row.component';

describe('BalanceRowComponent', () => {
  let component: BalanceRowComponent;
  let fixture: ComponentFixture<BalanceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
