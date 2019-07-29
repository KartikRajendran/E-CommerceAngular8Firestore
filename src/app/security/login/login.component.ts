import { Component, OnInit } from '@angular/core';
import { RegisterService, User } from 'src/app/services/register.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: '',
    created_at: new Date().getTime(),
    role: '',
  };

  constructor(private loginService: RegisterService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    // localStorage.setItem('loggedin', 'false');
  }

  login() {
    // console.log(this.loginService.getUserByEmail(this.user.email));
    this.loginService.getUserByEmail(this.user.email).subscribe(res => {

      if (res.length > 0) {
        const data: any = res[0].payload.doc.data();
        if (this.user.password === data.password) {
          localStorage.setItem('userid', res[0].payload.doc.id);
          localStorage.setItem('user_role', data.role);
          localStorage.setItem('loggedin', 'true');
          window.location.href = 'dashboard';
          // this.router.navigate(['dashboard']);
        } else {
          this.toastr.warning('Password was incorrect!!!', 'Login');
        }
      } else {
        this.toastr.warning('User with this email id doesn\'t exist!!!', 'Login');
      }
      // console.log(localStorage.getItem('loggedin'));
    });
  }

}
