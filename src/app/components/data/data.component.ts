import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { EventType } from 'src/app/models/EventType';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent implements OnInit, OnDestroy, OnChanges {

  alive = true;
  @Input()
  events: Array<EventType> = [];
  pagedEvents = new Array<EventType>();
  page = 1;

  constructor(private _paginationService: PaginationService) {
    this._paginationService.page$.pipe(takeWhile(() => this.alive)).subscribe(page => {
      this.pageEvents(page);
    });
  }
  
  /**
   * Gets events of the indicated page.
   * @param page Page number
   */
  private pageEvents(page: number) {
    this.page = page;
    let start = (this.page - 1) * this._paginationService.size;
    let end = start + this._paginationService.size;
    this.pagedEvents = this.events?.slice(start, end);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) {
      this.pageEvents(this.page);
    }
  }
  
  ngOnInit(): void {
    this.pageEvents(1);
  }
  
  ngOnDestroy(): void {
   this.alive = false;
  }
}
