import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';

// FireStore Implementation Start
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { SidenavbarComponent } from './common/sidenavbar/sidenavbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { UserlistComponent } from './user/userlist/userlist.component';
import { AdduserComponent } from './user/adduser/adduser.component';
// FireStore Implementation End

import { Ng2SearchPipeModule } from 'ng2-search-filter'; // importing the module for searching
import { Ng2OrderModule } from 'ng2-order-pipe'; // imported for sorting list purpose
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersComponent } from './restaurant/orders/orders.component';
import { AddOrderComponent } from './restaurant/add-order/add-order.component';
import { AddFoodComponent } from './restaurant/add-food/add-food.component';
import { FoodsComponent } from './restaurant/foods/foods.component'; // imported for Pagination Purpose

import { FoodName } from './customPipes/food.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FoodName,
    LoginComponent,
    RoutingComponents,
    DashboardComponent,
    HeaderComponent,
    SidenavbarComponent,
    FooterComponent,
    UserlistComponent,
    AdduserComponent,
    OrdersComponent,
    AddOrderComponent,
    AddFoodComponent,
    FoodsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
