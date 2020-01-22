import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNewsPageComponent } from './create-edit-news-page.component';

describe('CreateEditNewsPageComponent', () => {
  let component: CreateEditNewsPageComponent;
  let fixture: ComponentFixture<CreateEditNewsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditNewsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
