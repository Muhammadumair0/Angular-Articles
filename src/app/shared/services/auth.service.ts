import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { tokenNotExpired } from "angular2-jwt";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain: string = "http://localhost:3000/";

  authToken;
  user;

  constructor(private http: Http) { }


  loadToken() {
    this.authToken = localStorage.getItem("token");
  }

  RequestOptions() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "authorization": this.authToken
    });
    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }

  login(data) {

    return this.http.post(this.domain + "api/login", data, this.RequestOptions()).map((res) => {
      console.log(res.json());
      return res.json();
    });

  }

  getAllData() {
    return this.http.get(this.domain + "api/allArticles").map((res) => {
      return res.json();
    });
  }

  postArtilce(data) {
    this.loadToken();
    return this.http.put(this.domain + "api/postArticle", data, this.RequestOptions()).map((res) => {
      console.log("Post Article" + res.json());
      return res.json();
    });
  }

  updateArticle(data) {
    this.loadToken();
    return this.http.put(this.domain + "api/updateArticle", data, this.RequestOptions()).map(res => {
      console.log("Update Article" + res.json());
      return res.json();
    });
  }

  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    this.authToken = token;
    this.user = user;
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
