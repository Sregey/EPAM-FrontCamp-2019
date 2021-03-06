import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsListPageComponent } from './pages/news-list-page/news-list-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NewsItemComponent } from './pages/news-list-page/news-item/news-item.component';
import { NewsDetailsPageComponent } from './pages/news-details-page/news-details-page.component';
import { CreateEditNewsPageComponent } from './pages/create-edit-news-page/create-edit-news-page.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NewsListPageComponent,
        NotFoundPageComponent,
        NewsItemComponent,
        NewsDetailsPageComponent,
        CreateEditNewsPageComponent,
        PageTitleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [NewsItemComponent, PageTitleComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
    constructor(injector: Injector) {
        const pageTitleElement = createCustomElement(PageTitleComponent, {injector});
        customElements.define('app-page-title', pageTitleElement);
    }
}
