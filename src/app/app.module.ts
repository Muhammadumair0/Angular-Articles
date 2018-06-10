import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { FirstSectionComponent } from './core/first-section/first-section.component';
import { SecondSectionComponent } from './core/second-section/second-section.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { LoginComponent } from './login/login.component';
import { ReadArticlesComponent } from './read-articles/read-articles.component';
import { WriteArticleComponent } from './write-article/write-article.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

import { routes } from "./app.routing";
import { CoreComponent } from './core/core/core.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstSectionComponent,
    SecondSectionComponent,
    FooterComponent,
    NavComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
