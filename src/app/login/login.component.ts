import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseLogin } from './response';
import * as CryptoJS from 'crypto-js';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  response!: ResponseLogin;
  errorLogin: boolean = false;
  

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.connect(this.f.username.value, this.f.password.value)
  }

  connect(user: string, pass: string) {
    if (user != "" && user != null && pass != "" && pass != null)
      this.loginService.login(user, CryptoJS.SHA256(pass).toString()).subscribe(res => {
        this.response = res;
        console.log(res)
        if(this.response.success) {
          this.userService.get(res.id+"").subscribe(u => {
            if(u.role == 1) {
              localStorage.setItem("token", this.response.token);
              location.reload()
            } else {
              this.errorLogin = true;
            }
          })         
        }
      }, err => {
        this.errorLogin = true;
      });
  }

}
