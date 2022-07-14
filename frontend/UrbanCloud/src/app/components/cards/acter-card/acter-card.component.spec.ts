import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActerCardComponent } from './acter-card.component';

describe('ActerCardComponent', () => {
  let component: ActerCardComponent;
  let fixture: ComponentFixture<ActerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
