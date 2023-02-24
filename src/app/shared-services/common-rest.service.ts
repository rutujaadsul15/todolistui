import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/javascript' })};

@Injectable({
  providedIn: 'root'
})
export class CommonRestService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) { }

  public postMethod(url: any, requestBody: any): Observable<any> {
    return this.httpClient.post(url, requestBody).pipe();
  }

  public getMethod(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  public deleteMethod(url: string): Observable<any> {
    return this.httpClient.delete(url);
  }
   public putMethod(url: any, requestBody: any): Observable<any> {
    return this.httpClient.put(url, requestBody);
  }

}
