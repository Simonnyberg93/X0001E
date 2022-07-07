import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsOfInterestComponent } from './topics-of-interest.component';

describe('TopicsOfInterestComponent', () => {
  let component: TopicsOfInterestComponent;
  let fixture: ComponentFixture<TopicsOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsOfInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
