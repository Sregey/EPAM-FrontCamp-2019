import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNewsPageComponent } from './create-edit-news-page.component';
import { NewsInMemoryService } from 'src/services/news-in-memory-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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

const locationSpy = jasmine.createSpyObj('Location', ['back']);

const newsInMemoryServiceSpy = jasmine.createSpyObj('NewsInMemoryService', [ 'getNewsByUrl', 'add', 'update' ]);
newsInMemoryServiceSpy.getNewsByUrl.and.callFake((url: string) => {
  return testNews.url === url ? testNews : null;
});

describe('CreateEditNewsPageComponent', () => {
  let component: CreateEditNewsPageComponent;
  let fixture: ComponentFixture<CreateEditNewsPageComponent>;

  let newsService: any; // NewsInMemoryService
  let route: any;  // ActivatedRoute
  let router: any; // Router
  let location: any; // Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditNewsPageComponent ],
      providers: [
        { provide: NewsInMemoryService, useValue: newsInMemoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {snapshot: {params: {}}} },
        { provide: Location, useValue: locationSpy },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditNewsPageComponent);
    component = fixture.componentInstance;

    newsService = TestBed.get(NewsInMemoryService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it(`should create 'Create' form`, () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.title).toBe('Create', `Title should be 'Create'`);
    expect(component.newsForm.get('id').value).toBeNull();
    expect(component.newsForm.get('heading').value).toBeNull();
    expect(component.newsForm.get('description').value).toBeNull();
    expect(component.newsForm.get('content').value).toBeNull();
    expect(component.newsForm.get('image').value).toBeNull();
    expect(component.newsForm.get('date').value.getTime()).toBeCloseTo(new Date().getTime(), -3);
    expect(component.newsForm.get('author').value).toBeNull();
    expect(component.newsForm.get('sourceUrl').value).toBeNull();
  });

  it(`should create 'Edit' form`, () => {
    route.snapshot.params.url = 'test-1';
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.title).toBe('Edit', `Title should be 'Edit'`);
    expect(component.newsForm.get('id').value).toBe(testNews.id, 'Id is filled incorrect');
    expect(component.newsForm.get('heading').value).toBe(testNews.title, 'Heading is filled incorrect');
    expect(component.newsForm.get('description').value).toBe(testNews.description, 'Description is filled incorrect');
    expect(component.newsForm.get('content').value).toBe(testNews.text, 'Content is filled incorrect');
    expect(component.newsForm.get('image').value).toBe(testNews.imageUrl, 'Image is filled incorrect');
    expect(component.newsForm.get('date').value).toBe(testNews.date, 'Date is filled incorrect');
    expect(component.newsForm.get('author').value).toBe(testNews.author, 'Author is filled incorrect');
    expect(component.newsForm.get('sourceUrl').value).toBe(testNews.url, 'SourceUrl is filled incorrect');
  });

  it(`#saveClicked() should add news for 'Create' form`, () => {
    fixture.detectChanges();

    component.saveClicked();

    const spy = newsService.add as jasmine.Spy;
    const addCallsCount = spy.calls.count();

    expect(addCallsCount).toBe(1, `should call 'add' method.`);
  });

  it(`#saveClicked() should update news for 'Edit' form`, () => {
    route.snapshot.params.url = 'test-1';
    fixture.detectChanges();

    component.saveClicked();

    const spy = newsService.update as jasmine.Spy;
    const updateCallsCount = spy.calls.count();

    expect(updateCallsCount).toBe(1, `should call 'update' method.`);
  });
});
