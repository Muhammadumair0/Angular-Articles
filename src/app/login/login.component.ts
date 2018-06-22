import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { Router } from '@angular/router';
import { AuthGuard } from "../gurads/auth.guard";
import { UpdateAuthGuard } from "../gurads/update-auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard,
    private uAuthGurad: UpdateAuthGuard
  ) { }

  ngOnInit() {
    console.log(this.authGuard.redirectUrl);
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.authGuard.redirectUrl) {
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
    if (this.uAuthGurad.goUrl) {
      this.previousUrl = this.uAuthGurad.goUrl;
      this.uAuthGurad.goUrl = undefined;
    }
  }



  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }


  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }


  onLoginSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    console.log(user);

    this.authService.login(user).subscribe((data) => {
      console.log(data);
      if (data.status !== 200) {
        this.processing = false;
        this.enableForm();
      } else {
        this.authService.storeUserData(data.token, data.username, data.profile);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/home']);
          }
        }, 2000);
      }
    }
    );
  }



}
