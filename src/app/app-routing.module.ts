import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { GuardService } from './services/guard.service';
import { AddProductTypeComponent } from './product/add-product-type/add-product-type.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductTypeListComponent } from './product/product-type-list/product-type-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrdersComponent } from './restaurant/orders/orders.component';
import { AddOrderComponent } from './restaurant/add-order/add-order.component';
import { AddFoodComponent } from './restaurant/add-food/add-food.component';
import { FoodsComponent } from './restaurant/foods/foods.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [GuardService],
    component: DashboardComponent
  },
  {
    path: 'userlist',
    canActivate: [GuardService],
    component: UserlistComponent
  },
  {
    path: 'add-product-type',
    canActivate: [GuardService],
    component: AddProductTypeComponent
  },
  {
    path: 'add-product',
    canActivate: [GuardService],
    component: AddProductComponent
  },
  {
    path: 'edit-product-type/:id',
    canActivate: [GuardService],
    component: AddProductTypeComponent
  },
  {
    path: 'edit-product/:id',
    canActivate: [GuardService],
    component: AddProductComponent
  },
  {
    path: 'product-type-list',
    canActivate: [GuardService],
    component: ProductTypeListComponent
  },
  {
    path: 'product-list',
    canActivate: [GuardService],
    component: ProductListComponent
  },
  {
    path: 'order-list',
    canActivate: [GuardService],
    component: OrdersComponent
  },
  { path: 'food-list', canActivate: [GuardService], component: FoodsComponent },
  {
    path: 'edit-order/:id',
    canActivate: [GuardService],
    component: AddOrderComponent
  },
  {
    path: 'edit-food/:id',
    canActivate: [GuardService],
    component: AddFoodComponent
  },
  {
    path: 'add-order',
    canActivate: [GuardService],
    component: AddOrderComponent
  },
  { path: 'add-food', canActivate: [GuardService], component: AddFoodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponents = [
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  UserlistComponent,
  AddProductTypeComponent,
  AddProductComponent,
  ProductTypeListComponent,
  ProductListComponent,
  OrdersComponent,
  FoodsComponent,
  AddOrderComponent,
  AddFoodComponent
];
