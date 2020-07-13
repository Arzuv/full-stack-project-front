import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Api/api.service';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Form = {
    email: '',
    password: ''
  };
  isLoggedIn: boolean;
  errorLoginIn = true;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.verificationOfAuth().subscribe(
      (res) => {
        this.isLoggedIn = true;
      },
      (err) => {
        this.isLoggedIn = false;
      }
    );
  }

  postLogin(): void {
    this.apiService.postLogin(this.model).subscribe(
      (res) => {
        const result = 'Bearer ' + res.token;
        res.token = result;
        const serialObj = JSON.stringify(res);
        localStorage.setItem('USER', serialObj);
        this.isLoggedIn = true;
        this.router.navigate([`/`]);
      },
      (err) => {
        this.errorLoginIn = false;
      }
    );
  }
  logout(): void {
    localStorage.removeItem('USER');
    this.isLoggedIn = false;
  }
}

export interface Form {
  email: string;
  password: string;
}
