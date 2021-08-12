import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

import { environment } from 'src/environments/environment';

import { BROWSER_STORAGE } from '../Models/storage';
import { Loc8rDataService } from '../loc8r-data.service';

const httpOptions = {
    headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('loc8r-token')
    })
};

@Injectable({ providedIn: 'root' })
export class FavoritessService {
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

    }

    public setHeaderAuthToken() {
        const token = this.storage.getItem('loc8r-token');
        if (token)
            httpOptions.headers.append('Authorization', 'JWT ' + token);
    }

    getFavorites(): Observable<any[]> {
        this.url = this.api + '/favorites/';

        const token = this.storage.getItem('loc8r-token');
        const bearerToken = 'jwt ' + token;
        httpOptions.headers.append('Authorization', bearerToken);

        return this.httpClient.get<any[]>(this.url, httpOptions);
    }
    createFavorite(favorite): Observable<any[]> {
        this.url = this.api + '/favorites/';

        const token = this.storage.getItem('loc8r-token');
        const bearerToken = 'jwt ' + token;
        httpOptions.headers.append('Authorization', bearerToken);

        return this.httpClient.post<any>(this.url, favorite, httpOptions)
            .pipe(
                catchError(this.error)
            );
    }

    updateFavorite(favorite: any): Observable<any> {
        this.url = this.api + '/favorites/';

        const token = this.storage.getItem('loc8r-token');
        const bearerToken = 'jwt ' + token;
        httpOptions.headers.append('Authorization', bearerToken);

        return this.httpClient.put<any>(this.url, favorite, httpOptions);
    }

    deleteFavorite(): Observable<any> {
        return this.httpClient.delete<any>(this.url, httpOptions);
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