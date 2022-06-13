import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faList, faTable, faThLarge } from '@fortawesome/free-solid-svg-icons';
import * as bulmaToast from 'bulma-toast';
import { merge, Observable } from 'rxjs';
import { finalize, reduce, take } from 'rxjs/operators';
import { EventEnum } from 'src/app/enums/event-enum';
import { ViewEnum } from 'src/app/enums/view-enum';
import { Birth } from 'src/app/models/Birth';
import { Death } from 'src/app/models/Death';
import { Event } from 'src/app/models/Event';
import { EventType } from 'src/app/models/EventType';
import { HistoryDate } from 'src/app/models/HistoryDate';
import { HistoryApiService } from 'src/app/services/history-api/history-api.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { invalidFinalDateValidator, invalidInitialDateValidator, notSameMonthValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  events: EventType[];
  eventEnum = EventEnum;
  form: FormGroup;
  loading = false;
  view = ViewEnum.LIST;
  modal = false;
  selectedEvent: EventType;

  faTable = faTable;
  faList = faList;
  faThLarge = faThLarge;
  viewEnum = ViewEnum;

  get f() { return this.form.controls;}

  constructor(
    private _historyApiService: HistoryApiService,
    private _paginationService: PaginationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadEvents();
  }

  /**
   * Inits the form
   */
  private initForm() {
    this.form = this._fb.group({
      'eventType': null,
      'dayFrom': [null, [Validators.min(1), Validators.max(31)], ],
      'monthFrom': null,
      'dayTo': [null, [Validators.min(1), Validators.max(31)]],
      'monthTo': null
    }, { validators: [notSameMonthValidator, invalidInitialDateValidator, invalidFinalDateValidator] });
  }

  /**
   * Searchs for events according to the form.
   */
  onSearch() {
    if (this.form.valid) {
      let dayFrom = this.f.dayFrom?.value;
      let dayTo = this.f.dayTo?.value;
      let monthFrom = this.f.monthFrom?.value;
      let monthTo = this.f.monthTo?.value;
      let requests = [];
      if (dayFrom && dayTo && monthFrom && monthTo) {
        for (let i = dayFrom; i <= dayTo; i++) {
          requests.push(this._historyApiService.date(monthFrom, i));
        }
        this.loadRangeEvents(requests);
      } else if (dayFrom && monthFrom) {
        let date = new Date(2020, monthFrom, dayFrom);
        while(date.getMonth() == monthFrom) {
          requests.push(this._historyApiService.date(monthFrom, date.getDate()));
          date.setDate(date.getDate() + 1)
        }
        this.loadRangeEvents(requests);
      } else if (dayTo && monthTo) {
        let date = new Date(2020, monthTo, dayTo);
        while(date.getMonth() == monthTo) {
          requests.push(this._historyApiService.date(monthTo, date.getDate()));
          date.setDate(date.getDate() - 1)
        }
        this.loadRangeEvents(requests);
      } else {
        this.loadEvents();
      }
    }
  }

  /**
   * Searchs for events in a date range.
   * @param requests List of request
   */
  private loadRangeEvents(requests: Array<Observable<HttpResponse<any>>>) {
    this.loading = true;
    this._paginationService.goTo(1);
    merge(...requests).pipe(
      // This will gather all responses and emit them all when they're done
      reduce((all, res) => all.concat(res.body), []),
      take(1),
      finalize(() => this.loading = false)
    ).subscribe(allRes => {
      if (allRes?.length > 0) {
        let historyDate = allRes as HistoryDate[];
        this.events = [];
        let eventType = this.f.eventType?.value;
        historyDate.forEach(element => {
          this.filterEvents(eventType, element);
        });

        this._paginationService.setTotal(this.events.length);
      } else {
        this.dataError();
      }
    }, () => this.dataError());
  }

  /**
   * Filters events according to their event type.
   * @param eventType Event Type to filter
   * @param element History Date to filter
   */
  private filterEvents(eventType: any, element: HistoryDate) {
    this.events = this.events
      .concat((!eventType || eventType == EventEnum.BIRTH) && element.data?.Births
        ? element.data?.Births.map(b => new Birth(b)) : [])
      .concat((!eventType || eventType == EventEnum.EVENT) && element.data?.Events
        ? element.data?.Events.map(e => new Event(e)) : [])
      .concat((!eventType || eventType == EventEnum.DEATH) && element.data?.Deaths
        ? element.data?.Deaths.map(d => new Death(d)) : []);
  }

  /**
   * Searchs for today events.
   */
  private loadEvents() {
    this.loading = true;
    this._paginationService.goTo(1);
    this._historyApiService.date().pipe(take(1), finalize(() => this.loading = false)).subscribe(res => {
      if (res?.body) {
        let historyDate = res.body as HistoryDate;
        this.events = [];
        let eventType = this.f.eventType?.value;
        this.filterEvents(eventType, historyDate);

        this._paginationService.setTotal(this.events.length);
      } else {
        this.dataError();
      }
    }, () => this.dataError());
  }

  /**
   * Shows an error toast.
   */
  private dataError() {
    bulmaToast.toast({
      message: 'Error getting data.',
      type: 'is-danger',
      dismissible: true,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    });
  }

  /**
   * Sets view mode.
   * @param view View mode
   */
  setView(view: ViewEnum) {
    this.view = view;
  }

  /**
   * Closes the modal
   */
  closeModal() {
    this.modal = false;
  }

  /**
   * Opens the modal
   * @param event Selected event
   */
  openModal(event?: EventType) {
    this.modal = true;
    if (event) {
      this.selectedEvent = event;
    }
  }
}
