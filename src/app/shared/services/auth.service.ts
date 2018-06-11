import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { environment } from "../../../environments/environment";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain: string = environment.domain;
  constructor(private http: Http) { }

  RequestOptions() {
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }

  login(data) {

    return this.http.post(this.domain + "api/user", data, this.RequestOptions()).map((res) => {
      return res.json();
    });

  }


}
