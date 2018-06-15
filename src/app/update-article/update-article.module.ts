import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './update-article-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateArticleComponent } from "./update-article.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateArticleComponent]
})
export class UpdateArticleModule { }
