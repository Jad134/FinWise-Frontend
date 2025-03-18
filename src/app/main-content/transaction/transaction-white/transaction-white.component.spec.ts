import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionWhiteComponent } from './transaction-white.component';

describe('TransactionWhiteComponent', () => {
  let component: TransactionWhiteComponent;
  let fixture: ComponentFixture<TransactionWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionWhiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
