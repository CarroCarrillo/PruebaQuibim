import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { DataComponent } from '../data/data.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent extends DataComponent {

  @Output() openModal = new EventEmitter<any>();
  faEye = faEye;

  constructor(public paginationService: PaginationService) {
    super(paginationService);
  }

}
