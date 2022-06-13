import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryApiService {

  API_ENDPOINT: string;
  
  constructor(
    private _httpService: HttpService
  ) {
    this.API_ENDPOINT = environment.API_ENDPOINT;
  }

  date(month?: number, day?: number) {
    let date = new Date();
    month = month ?? date.getMonth() + 1;
    day = day ?? date.getDate();
    let monthDay = '/' + month + '/' + day;

    return this._httpService.get(this.API_ENDPOINT + '/date' + monthDay);
  }
}
