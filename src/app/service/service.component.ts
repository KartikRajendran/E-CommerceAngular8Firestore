import { Component, OnInit } from '@angular/core';
import { OccupationService, Service } from '../services/occupation.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  Services: Service[];
  constructor(private occupationService: OccupationService, private router: Router,
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
    this.loadServiceTypeData();
    console.log(this.Services);
  }

  loadServiceTypeData() {
    this.occupationService.getServicesList().subscribe(res => {
      this.Services = res;
    });
  }

  viewAddService() {
    window.location.href = 'add-service';
    // this.router.navigate(['add-Service-type']);
  }

  editService(id: string) {
    window.location.href = 'edit-service/' + id;
  }

  deleteService(id: string) {
    this.occupationService.deleteService(id);
    this.toastr.success('Service Deleted Successfully!!', 'Service');
  }

}
