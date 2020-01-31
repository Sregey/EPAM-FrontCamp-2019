import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailsPageComponent } from './news-details-page.component';

import { NewsInMemoryService } from 'src/services/news-in-memory-service';
import { Router, ActivatedRoute } from '@angular/router';
import { News } from 'src/models/news';
import { Source } from 'src/models/source';

const testNews = new News({
  id: 1,
  title: 'title 1',
  description: 'description 1',
  text: 'text 1',
  date: new Date(),
  imageUrl: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2020/01/16/15791909846528.jpg',
  author: 'author 1',
  source: Source.Local,
  url: 'test-1',
});

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

const newsInMemoryServiceSpy = jasmine.createSpyObj('NewsInMemoryService', [ 'getNewsByUrl', 'delete' ]);
newsInMemoryServiceSpy.getNewsByUrl.and.callFake((url: string) => {
  return testNews.url === url ? testNews : null;
});

describe('NewsDetailsPageComponent', () => {
  let component: NewsDetailsPageComponent;
  let fixture: ComponentFixture<NewsDetailsPageComponent>;
  let newsService: any; // NewsInMemoryService
  let route: any;  // ActivatedRoute
  let router: any; // Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailsPageComponent],
      providers: [
        { provide: NewsInMemoryService, useValue: newsInMemoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {snapshot: {params: {}}} },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailsPageComponent);
    component = fixture.componentInstance;

    newsService = TestBed.get(NewsInMemoryService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);

    route.snapshot.params.url = 'test-1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#deleteClicked() should redirect to root url', () => {
    component.deleteClicked();

    const spy = router.navigateByUrl as jasmine.Spy;
    const navUrl = spy.calls.first().args[0];

    expect(navUrl).toBe('', 'should nav to site root');
  });

  it('#deleteClicked() should delete underlying news item', () => {
    component.deleteClicked();

    const spy = newsService.delete as jasmine.Spy;
    const deleteId = spy.calls.first().args[0];

    expect(deleteId).toBe(testNews.id, 'hould delete underlying news item');
  });
});
