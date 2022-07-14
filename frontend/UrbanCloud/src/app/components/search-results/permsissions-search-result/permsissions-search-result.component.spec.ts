import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermsissionsSearchResultComponent } from './permsissions-search-result.component';

describe('PermsissionsSearchResultComponent', () => {
  let component: PermsissionsSearchResultComponent;
  let fixture: ComponentFixture<PermsissionsSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermsissionsSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermsissionsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
