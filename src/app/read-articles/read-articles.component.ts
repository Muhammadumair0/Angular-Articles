import { Component, OnInit } from '@angular/core';

import { AuthService } from "../shared/services/auth.service";
import { ComponentsService } from "../shared/services/components.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.css']
})
export class ReadArticlesComponent implements OnInit {

  allData: any[];
  userMatch: string = localStorage.getItem("user");
  checkAuth;

  constructor(private authService: AuthService,
    private componentsService: ComponentsService,
    private router: Router) { }

  ngOnInit() {
    this.checkAuth = this.authService.loggedIn();
    this.authService.getAllData().subscribe(data => {
      this.allData = data.results;
    })
  }
  sendInfo(data) {
    this.componentsService.getInfo(data);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(["/home"]);
  }

  homePage() {
    this.router.navigate(["/home"]);
  }

}
