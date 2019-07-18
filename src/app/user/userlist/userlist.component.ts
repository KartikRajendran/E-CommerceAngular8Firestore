import { Component, OnInit } from '@angular/core';
import { RegisterService, User } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[];
  constructor(private userService: RegisterService, private router: Router,
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
    const role = localStorage.getItem('user_role');
    console.log(role);
    if (role === 'admin') {
      this.userService.getUsersList().subscribe(res => {
        console.log(res);
        this.users = res;
      });
    } else {
      this.router.navigate(['dashboard']);
    }
    // this.toastr.success('Hello world!', 'Toastr fun!');

    /* $.toast({
      heading: 'Welcome to Adminpro',
      text: 'Most powerfull and elegant design with tons of elements.',
      position: 'top-right',
      loaderBg: '#f33c49',
      icon: 'info',
      hideAfter: 6000,
      stack: 6
    }); */
  }

  editUser(id) {

  }

  deleteUser(id) {

  }
}
