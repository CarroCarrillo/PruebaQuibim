import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HistoryApiService } from 'src/app/services/history-api/history-api.service';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MockHistoryApiService extends HistoryApiService {

  constructor(public httpService: HttpService) {
    super(httpService);
  }

  date(month?: number, day?: number) {
    let response = { "body": {
        "date": "February 3",
        "url": "https://wikipedia.org/wiki/February_3",
        "data": {
          "Events": [
            {
              "year": "1112",
              "text": "Ramon Berenguer III, Count of Barcelona, and Douce I, Countess of Provence, marry, uniting the fortunes of those two states.",
              "html": "1112 - <a href=\"https://wikipedia.org/wiki/Ramon_Berenguer_III,_Count_of_Barcelona\" title=\"Ramon Berenguer III, Count of Barcelona\">Ramon Berenguer III, Count of Barcelona</a>, and <a href=\"https://wikipedia.org/wiki/Douce_I,_Countess_of_Provence\" title=\"Douce I, Countess of Provence\">Douce I, Countess of Provence</a>, marry, uniting the fortunes of those two states.",
              "no_year_html": "<a href=\"https://wikipedia.org/wiki/Ramon_Berenguer_III,_Count_of_Barcelona\" title=\"Ramon Berenguer III, Count of Barcelona\">Ramon Berenguer III, Count of Barcelona</a>, and <a href=\"https://wikipedia.org/wiki/Douce_I,_Countess_of_Provence\" title=\"Douce I, Countess of Provence\">Douce I, Countess of Provence</a>, marry, uniting the fortunes of those two states.",
              "links": [
                {
                  "title": "Ramon Berenguer III, Count of Barcelona",
                  "link": "https://wikipedia.org/wiki/Ramon_Berenguer_III,_Count_of_Barcelona"
                },
                {
                  "title": "Douce I, Countess of Provence",
                  "link": "https://wikipedia.org/wiki/Douce_I,_Countess_of_Provence"
                }
              ]
            }
          ]
        }
      }
    };

    return from([new HttpResponse<any>(response)]);
  }
}
