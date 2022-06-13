import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  page: BehaviorSubject<number>;
  page$: Observable<number>;
  size = 10;
  total = 0;
  totalPages = 0;

  constructor() {
    this.page = new BehaviorSubject<number>(1);
    this.page$ = this.page.asObservable();
  }

  setTotal(total: number) {
    this.total = total;
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.total / this.size);
  }

  previousPage() {
    this.page.next(this.page.getValue() - 1);
  }

  nextPage() {
    this.page.next(this.page.getValue() + 1);
  }

  goTo(page: number) {
    this.page.next(page);
  }
}
