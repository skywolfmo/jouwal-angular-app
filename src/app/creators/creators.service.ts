import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

import { environment } from 'src/environments/environment';

import { Creator } from '../Models/User/Creator';
import { BROWSER_STORAGE } from '../Models/storage';
import { Loc8rDataService } from '../loc8r-data.service';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': 'JWT ' + localStorage.getItem('loc8r-token')
  })
};

@Injectable({ providedIn: 'root' })
export class CreatorsService {
  api: string = environment.api;
  url: string;
  private handleError: HandleError;
  creatorUrl: string = '';

  /**
   * Constructor
   * @param httpClient 
   * 
   */
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private loc8rDataService: Loc8rDataService, private httpClient: HttpClient) {

    // this.handleError = httpErrorHandler.createHandleError('CreatorsService');
    // this.setHeaderAuthToken();
  }

  public setHeaderAuthToken() {
    const token = this.storage.getItem('loc8r-token');
    if (token)
      httpOptions.headers.append('Authorization', 'JWT ' + token);
  }
  /**
   * a function to get the Creators from the api
   * @returns Creators[]
   */
  getCreators(): Observable<any[]> {
    this.url = this.api + this.creatorUrl;


    return this.httpClient.get<any[]>(this.url);
  }

  /**
   * Get request the Creator by id from the api
   * @param id 
   */
  getCreator(id: string): Observable<any> {
    this.url = this.api + 'user/me';
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'jwt ' + token;
    httpOptions.headers.append('Authorization', bearerToken);

    return this.httpClient.get<any>(this.url);
  }
  /**
   * 
   * @param creator 
   */
  async getCreatorProfile(): Promise<Observable<any>> {
    this.url = this.api;
    const token = await this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;

    console.log(bearerToken);
    httpOptions.headers.set('authorization', bearerToken);
    console.log(httpOptions.headers);
    return this.httpClient.get<any>(this.api + '/users/me',  httpOptions);
  }
  /**
   * send a post request to the api with the object Creator
   * in order to create the object
   * @param Creator 
   * 
   */
  createCreator(formDate): Observable<any> {
    return this.httpClient.post<any>(this.api + '/users/me', formDate, httpOptions)
      .pipe(
        // catchError(this.handleError('createCreator', creator))
        catchError(this.error)

      );
  }
  updateCreator(creator: any): Observable<any> {
    return this.httpClient.put<any>(this.api + '/users/me', creator, httpOptions);
  }
  deleteCreator(): Observable<any> {
    return this.httpClient.delete<any>(this.api + '/users/me', httpOptions);
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}