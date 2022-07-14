import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchResultsComponent } from './top-search-results.component';

describe('TopSearchResultsComponent', () => {
  let component: TopSearchResultsComponent;
  let fixture: ComponentFixture<TopSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
