import { Component, OnInit } from '@angular/core'
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
    private adminService: AdminService,
  ) {}

  // Take all users data and show them
  async ngOnInit() {
    this.adminService.getUserData().subscribe(data => {
      this.data = data
      this.filteredData = data
      this.applyFilters()
    })
  }

  // Sort data by ascending or descending order
  sortingData() {
    this.sortingAsc = !this.sortingAsc
    this.applyFilters()
  }

  // Search user's data by email, date or uid
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement
    if (target) {
      this.searchingTerms = target.value
      this.applyFilters()
    }
  }

  // Combine filtering and sorting
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
