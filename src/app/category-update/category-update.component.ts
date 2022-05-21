import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {
  categoryId: String = '';
  categoryForm!: FormGroup;
  name: String = '';
  imageUrl: String = '';

  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params['id']);
    this.categoryForm = this.formBuilder.group({
      'categoryId' : [null],  
      'name' : [null, Validators.required],
      'imageUrl' : [null, Validators.required]
    });
  }

  getCategory(id: number) {
    this.api.getCategory(id).subscribe(data => {
      this.categoryId = data.categoryId;
      this.categoryForm.setValue({
        categoryId: data.categoryId,
        name: data.name,
        imageUrl : data.imageUrl,
      });
    });
  }

  updateCategory(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCategory(Number(this.categoryId), form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/category-details/' + this.categoryId]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
   }
}
