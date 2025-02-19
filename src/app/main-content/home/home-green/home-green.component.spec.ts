import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGreenComponent } from './home-green.component';

describe('HomeGreenComponent', () => {
  let component: HomeGreenComponent;
  let fixture: ComponentFixture<HomeGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
