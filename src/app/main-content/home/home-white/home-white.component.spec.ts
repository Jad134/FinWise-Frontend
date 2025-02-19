import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhiteComponent } from './home-white.component';

describe('HomeWhiteComponent', () => {
  let component: HomeWhiteComponent;
  let fixture: ComponentFixture<HomeWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWhiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
