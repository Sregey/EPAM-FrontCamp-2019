import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleComponent } from './page-title.component';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no title in the DOM after createComponent()', () => {
    expect(nativeElement.textContent).toEqual('');
  });

  it('should display a different test text', () => {
    const testText = 'Test Text';
    component.text = testText;
    fixture.detectChanges();
    expect(nativeElement.textContent).toContain(testText);
  });
});
