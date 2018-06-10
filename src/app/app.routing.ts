import { Routes } from '@angular/router';
import { CoreComponent } from "./core/core/core.component";

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
  }
];
