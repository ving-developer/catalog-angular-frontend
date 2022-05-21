import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: String;
  password!: String;
  dataSource!: User;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  addLogin(form: NgForm){
    this.isLoadingResults = true;
    this.api.Login(form).subscribe(res =>{
        this.dataSource = res;
        localStorage.setItem("jwt", this.dataSource.token);
        this.isLoadingResults = false;
        this.router.navigate(['/categories']);
      },
      (error) => {
        console.log(error);
        this.isLoadingResults = false;
      }
    );
  }
}
