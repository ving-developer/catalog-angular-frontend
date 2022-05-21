import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm!: FormGroup;
  nome: String = '';
  imagemUrl: String = '';
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      'name': [null,Validators.required],
      'imageUrl': [null,Validators.required]
    });
  }

  addCategory(form: NgForm) {
    this.isLoadingResults = true;
    this.api.createCategory(form)
      .subscribe(res => {
          const id = res.categoryId;
          this.isLoadingResults = false;
          this.router.navigate(['/categories']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
