import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ElementRef, Renderer2 } from "@angular/core";


@Component({
  selector: 'app-home-page-video',
  templateUrl: './home-page-video.component.html',
  styleUrls: ['./home-page-video.component.css']
})
export class HomePageVideoComponent implements OnInit {

  @ViewChild("muteVideo") videoElement: ElementRef;
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.renderer2.setAttribute(this.videoElement.nativeElement, "muted", "true");


  }

}
