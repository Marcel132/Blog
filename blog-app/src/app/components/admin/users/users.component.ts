import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  showArrow: boolean = true
  data: any = []

  constructor(
    private router: Router,
    private adminService: AdminService,
  ) {}

  async ngOnInit() {
    this.adminService.getUserData().subscribe(data => {
      this.data = data;
    })
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent){
    if(event.key === 'Escape'){
      this.router.navigate(['/admin'])
    }
  }
}
