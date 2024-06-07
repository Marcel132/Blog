import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AdminService } from '../../../service/admin.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  showArrow: boolean = true
  sortingAsc: boolean = true

  data: any = []
  filteredData: any = []
  searchingTerms: string = ''

  constructor(
    private router: Router,
    private adminService: AdminService,
  ) {}

  async ngOnInit() {
    this.adminService.getUserData().subscribe(data => {
      this.data = data
      this.filteredData = data
      this.applyFilters()
    })
  }

  sortingData() {
    this.sortingAsc = !this.sortingAsc
    this.applyFilters()
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    if (target) {
      this.searchingTerms = target.value
      this.applyFilters()
    }
  }

  applyFilters() {
    let filtered = this.data

    if (this.searchingTerms) {
      filtered = filtered.filter((data: any) =>
        data.Email.toLowerCase().includes(this.searchingTerms.toLowerCase()) ||
        data.CreatedAt.toLowerCase().includes(this.searchingTerms.toLowerCase()) ||
        data.uid.toLowerCase().includes(this.searchingTerms.toLowerCase())
      )
    }

    filtered.sort((a: any, b: any) => {
      if (this.sortingAsc) {
        return a.Email.localeCompare(b.Email)
      } else {
        return b.Email.localeCompare(a.Email)
      }
    })

    this.filteredData = filtered
  }

}
