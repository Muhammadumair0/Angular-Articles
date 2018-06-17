import { Routes } from '@angular/router';
import { CoreComponent } from "./core/core/core.component";

import { AuthGuard } from "./gurads/auth.guard";
import { UpdateAuthGuard } from "./gurads/update-auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: "full"
  },

  {
    path: "home",
    component: CoreComponent
  },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginModule"
  },
  {
    path: "read",
    loadChildren: "./read-articles/read-articles.module#ReadArticlesModule"
  },
  {
    path: "write",
    loadChildren: "./write-article/write-article.module#WriteArticleModule",
    canActivate: [AuthGuard]
  },
  {
    path: "update",
    loadChildren: "./update-article/update-article.module#UpdateArticleModule",
    canActivate: [UpdateAuthGuard]
  }
];
