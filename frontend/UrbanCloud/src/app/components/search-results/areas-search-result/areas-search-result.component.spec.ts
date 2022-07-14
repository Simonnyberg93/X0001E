import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasSearchResultComponent } from './areas-search-result.component';

describe('AreasSearchResultComponent', () => {
  let component: AreasSearchResultComponent;
  let fixture: ComponentFixture<AreasSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
