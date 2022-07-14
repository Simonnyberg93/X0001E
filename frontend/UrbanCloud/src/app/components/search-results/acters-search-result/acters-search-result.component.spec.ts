import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActersSearchResultComponent } from './acters-search-result.component';

describe('ActersSearchResultComponent', () => {
  let component: ActersSearchResultComponent;
  let fixture: ComponentFixture<ActersSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActersSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActersSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
