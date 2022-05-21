import { Component, OnInit } from '@angular/core';
import { Category } from 'src/models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category = { categoryId: '', name: '', imageUrl: ''};
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params['id']);
  }

  getCategory(id: number) {
    this.api.getCategory(id)
      .subscribe(data => {
        this.category = data;
           console.log(this.category);
             this.isLoadingResults = false;
      });
  }

  deleteCategory(id: string) {
    this.isLoadingResults = true;
    this.api.deleteCategory(Number(id))
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/categories']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
