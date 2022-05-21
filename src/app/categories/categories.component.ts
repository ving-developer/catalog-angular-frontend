import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'image', 'action'];
  dataSource!: Category[];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCategories()
    .subscribe(res => {
        this.dataSource = res;
        console.log(this.dataSource);
        this.isLoadingResults = false;
      },
      error => {
        console.log(error);
        this.isLoadingResults = false;
      }
    );
  }

}
