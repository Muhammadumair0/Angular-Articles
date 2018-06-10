import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadArticlesRoutingModule } from './read-articles-routing.module';
import { ReadArticlesComponent } from './read-articles.component';

@NgModule({
  imports: [
    CommonModule,
    ReadArticlesRoutingModule
  ],
  declarations: [ReadArticlesComponent]
})
export class ReadArticlesModule { }
