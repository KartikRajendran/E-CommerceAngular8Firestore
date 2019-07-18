import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class GuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const loggedin = localStorage.getItem("loggedin");
    console.log(loggedin);
    if (loggedin && loggedin === 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
