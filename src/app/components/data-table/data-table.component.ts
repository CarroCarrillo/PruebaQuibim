import { Component, EventEmitter, Output } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.sass']
})
export class DataTableComponent extends DataComponent {

  @Output() openModal = new EventEmitter<any>();
  faEye = faEye;

  constructor(public paginationService: PaginationService) {
    super(paginationService);
  }

}
