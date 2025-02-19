import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisGreenComponent } from './analysis-green.component';

describe('AnalysisGreenComponent', () => {
  let component: AnalysisGreenComponent;
  let fixture: ComponentFixture<AnalysisGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisGreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
