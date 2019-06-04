import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNormalViewComponent } from './category-normal-view.component';

describe('CategoryNormalViewComponent', () => {
  let component: CategoryNormalViewComponent;
  let fixture: ComponentFixture<CategoryNormalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNormalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNormalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
