import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private _httpClient: HttpClient) {}

  get(path: string, params?: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    return this._httpClient.get(path, this.searchParamsClient(params, headers));
  }

  getFile(path: string, params?: any, headers?: HttpHeaders): Observable<HttpResponse<Blob>> {
    return this._httpClient.get(path, {...this.searchParamsClient(params, headers), responseType: 'blob'});
  }

  post(path: string, body?: any, params?: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    return this._httpClient.post(path, body, this.searchParamsClient(params, headers));
  }

  postFile(path: string, body?: any, params?: any, headers?: HttpHeaders): Observable<HttpResponse<Blob>> {
    return this._httpClient.post(path, body, {...this.searchParamsClient(params, headers), responseType: 'blob'});
  }

  put(path: string, body?: any, params?: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    return this._httpClient.put(path, body, this.searchParamsClient(params, headers));
  }

  delete(path: string, params?: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    return this._httpClient.delete(path, this.searchParamsClient(params, headers));
  }

  progressHttpRequest(method: string, path: string, body: any, params?: any, headers?: HttpHeaders) {
    return this._httpClient.request(new HttpRequest(method, path, body, this.searchParamsClient(params, headers, true)));
  }

  private searchParamsClient(params: any, headers?: HttpHeaders, progress?: boolean) {
    const options = {
      headers: headers ? headers : new HttpHeaders().set('Content-type', 'application/json'),
      params: new HttpParams(),
      observe: 'response' as 'response',
      reportProgress: progress
    };

    if (params) {
      for (const key of Object.getOwnPropertyNames(params)) {
        if (params[key] != null && params[key] != undefined) {
          options.params = options.params.set(key, params[key]);
        }
      }
    }

    return options;
  }

}
