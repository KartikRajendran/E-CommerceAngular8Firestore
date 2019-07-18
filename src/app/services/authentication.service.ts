import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  logout() {
    localStorage.setItem('loggedin', 'false');
    this.router.navigate(['login']);
  }
}
