import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { routes } from './read-articles-routing.module';
import { ReadArticlesComponent } from './read-articles.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReadArticlesComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class ReadArticlesModule { }
