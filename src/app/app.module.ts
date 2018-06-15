import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { FirstSectionComponent } from './core/first-section/first-section.component';
import { SecondSectionComponent } from './core/second-section/second-section.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { CoreComponent } from './core/core/core.component';
import { routes } from "./app.routing";
import { AuthService } from "./shared/services/auth.service";


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
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports: [BrowserModule]
})
export class AppModule { }
