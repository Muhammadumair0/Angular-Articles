import { Component, OnInit } from '@angular/core';

import { AuthService } from "../shared/services/auth.service";
import { ComponentsService } from "../shared/services/components.service";

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.css']
})
export class ReadArticlesComponent implements OnInit {

  allData: any[];

  constructor(private authService: AuthService,
    private componentsService: ComponentsService) { }

  ngOnInit() {
    this.authService.getAllData().subscribe(data => {
      this.allData = data.results;
    })
  }
  sendInfo(data) {
    this.componentsService.getInfo(data);
  }

}
