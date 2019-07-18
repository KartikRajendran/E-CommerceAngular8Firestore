import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  role: string;
  constructor() { }

  ngOnInit() {
    this.role = localStorage.getItem('user_role');
  }

}
