import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  Categorys: Category[];
  constructor(private categoryService: CategoryService, private router: Router,
              private toastr: ToastrService) { }

  // sorting
  key = 'name'; // set default
  reverse = false;
  // initializing p to one
  p = 1;
  search = '';
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.loadCategoryData();
    console.log(this.Categorys);
  }

  loadCategoryData() {
    this.categoryService.getCategorysList().subscribe(res => {
      this.Categorys = res;
    });
  }

  viewAddCategory() {
    window.location.href = 'add-category';
    // this.router.navigate(['add-product-type']);
  }

  editCategory(id: string) {
    window.location.href = 'edit-category/' + id;
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
    this.toastr.success('Category Deleted Successfully!!', 'Category');
  }

}
