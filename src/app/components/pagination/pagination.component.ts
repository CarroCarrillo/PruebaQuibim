import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

  page: number;

  constructor(public p: PaginationService) {
    // Page change detection
    this.p.page$.subscribe(page => this.page = page);
  }

  ngOnInit(): void {
    this.p.calculateTotalPages();
  }

}
