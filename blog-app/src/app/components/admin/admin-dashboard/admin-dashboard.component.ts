import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public adminService: AdminService
  ){}
  isAdmin: boolean = this.adminService.isAdmin
  isWriter: boolean = this.adminService.isWriter;
  showArrow: boolean = true

  ngOnInit() {
  }
}
