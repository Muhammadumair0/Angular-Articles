import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-first-section',
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.css']
})
export class FirstSectionComponent implements OnInit {


  isLoggedIn;
  userName = localStorage.getItem("user");


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.loggedIn();
  }

}
