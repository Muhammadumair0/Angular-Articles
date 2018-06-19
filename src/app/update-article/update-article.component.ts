import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../shared/services/auth.service";
import { ComponentsService } from "../shared/services/components.service";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  profileUrl: string = "assets/profile.png";
  articleUrl: string = "assets/articles.jpg";
  form: FormGroup;
  processing: boolean;

  d = new Date();

  getDataInfo = {};

  postTextValue: boolean;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private componentsService: ComponentsService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl(localStorage.getItem("user"), [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
        this.validateControl
      ]),
      title: new FormControl(localStorage.getItem("title"), [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(30)
      ]),
      profileUrl: new FormControl(localStorage.getItem("profileImage"), [
        Validators.required,
        this.validateImage
      ]),
      articleUrl: new FormControl(localStorage.getItem("articleImage"), [
        Validators.required,
        this.validateImage
      ]),
      post: new FormControl(localStorage.getItem("description"), [
        Validators.required,
        Validators.minLength(120)
      ])
    });

    this.form.controls['username'].disable();
    this.form.controls['title'].disable();
  }

  validateControl(controls) {
    const regExp = new RegExp(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }

  validateImage(controls) {
    const regExp = new RegExp(/.*\/.*.(png|jpg)/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }


  onPostSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      "name": this.form.get('username').value,
      "title": this.form.get('title').value,
      "imageUrl": {
        "profile": this.form.get('profileUrl').value,
        "image": this.form.get('articleUrl').value
      },
      "description": this.form.get('post').value,
      "publishDate": this.d.toDateString()
    }
    console.log(user);

    this.authService.updateArticle(user).subscribe(data => {
      console.log(data);
      if (!data) {
        this.processing = false;
        this.enableForm();
      } else {
        setTimeout(() => {
          this.router.navigate(['/read/articles']);
        }, 2000);
      }
    });

  }

  disableForm() {
    this.form.controls['profileUrl'].disable();
    this.form.controls['articleUrl'].disable();
    this.form.controls['post'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['title'].enable();
    this.form.controls['profileUrl'].enable();
    this.form.controls['articleUrl'].enable();
    this.form.controls['post'].enable();
  }

  profileValue(value) {
    this.profileUrl = value;
  }
  articleValue(value) {
    this.articleUrl = value;
  }

  postText(val) {
    if (val.length >= 120) {
      return this.postTextValue = false;
    } else {
      return this.postTextValue = true;
    }
  }


}
