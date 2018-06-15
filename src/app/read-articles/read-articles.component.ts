import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-read-articles',
  templateUrl: './read-articles.component.html',
  styleUrls: ['./read-articles.component.css']
})
export class ReadArticlesComponent implements OnInit {

  allData: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAllData().subscribe(data => {
      this.allData = data.results;
    })
  }

}
