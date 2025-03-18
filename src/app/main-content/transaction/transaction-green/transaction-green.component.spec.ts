import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGreenComponent } from './transaction-green.component';

describe('TransactionGreenComponent', () => {
  let component: TransactionGreenComponent;
  let fixture: ComponentFixture<TransactionGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionGreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
