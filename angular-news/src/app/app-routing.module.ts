import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListPageComponent } from './pages/news-list-page/news-list-page.component';
import { NewsDetailsPageComponent } from './pages/news-details-page/news-details-page.component';
import { CreateEditNewsPageComponent } from './pages/create-edit-news-page/create-edit-news-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: NewsListPageComponent},
  {path: 'news/create', component: CreateEditNewsPageComponent, data: { title: 'Create' }},
  {path: 'news/edit/:url', component: CreateEditNewsPageComponent},
  {path: 'news/:url', component: NewsDetailsPageComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '/404'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
