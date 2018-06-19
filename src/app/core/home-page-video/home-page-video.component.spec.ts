import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageVideoComponent } from './home-page-video.component';

describe('HomePageVideoComponent', () => {
  let component: HomePageVideoComponent;
  let fixture: ComponentFixture<HomePageVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
