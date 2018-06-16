import { Injectable } from '@angular/core';

@Injectable()
export class ComponentsService {

  constructor() { }

  getInfo(data) {
    localStorage.setItem("name", data.name);
    localStorage.setItem("title", data.title);
    localStorage.setItem("profileImage", data.imageUrl.profile);
    localStorage.setItem("articleImage", data.imageUrl.image);
    localStorage.setItem("description", data.description);
  }

}
