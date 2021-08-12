import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

import { environment } from 'src/environments/environment';

import { Project } from '../Models/Content/Project';
import { Loc8rDataService } from '../loc8r-data.service';
import { BROWSER_STORAGE } from '../Models/storage';

var httpOptions = {
  headers: new HttpHeaders({
    // 'content-type': 'multipart/form-data',
    'Authorization': 'JWT ' + localStorage.getItem('loc8r-token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  api: string = environment.api;
  url: string;
  config: any;
  // private handleError: HandleError;
  projectUrl: string = '/articles';

  /**
   * Constructor
   * @param httpClient 
   * 
   */

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage, private httpClient: HttpClient) {
    // this.handleError = httpErrorHandler.createHandleError('ProjectsService');
  }

  public setHeaderAuthToken() {
    const token = this.storage.getItem('loc8r-token');
    if (token)
      httpOptions.headers.append('Authorization', 'JWT ' + token);
  }

  /**
   * a function to get the Projects from the api
   * @returns Projects[]
   */
  getProjects(): Observable<any[]> {
    this.url = this.api + this.projectUrl;
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('Authorization', bearerToken);

    return this.httpClient.get<any[]>(this.url, httpOptions);
  }

  searchTours(city): Observable<any[]> {
    city = city.charAt(0).toUpperCase() + city.slice(1)

    this.url = this.api + '/search?city=' + city;
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('Authorization', bearerToken);

    return this.httpClient.get<any[]>(this.url, httpOptions);
  }


  /**
   * Get request the Project by id from the api
   * @param id 
   */
  getProject(id: any): Observable<any> {

    this.url = this.api + this.projectUrl;
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('Authorization', bearerToken);
    return this.httpClient.get<any>(this.url + '/' + id, httpOptions);
  }
  /**
   * send a post request to the api with the object Project
   * in order to create the object
   * @param Project 
   * 
   */
  createProject(project: Project): Observable<Project> {
    // this.setHeaderAuthToken();
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('Authorization', bearerToken);
    this.url = this.api + this.projectUrl;

    return this.httpClient.post<Project>(this.url, project, httpOptions)
      .pipe(
        catchError(this.error)
      );
  }

  createProjectForm(formData: FormData): Observable<any> {
    // this.setHeaderAuthToken();
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('authorization', bearerToken);
    this.url = this.api + this.projectUrl;

    return this.httpClient.post<any>(this.url, formData, httpOptions)
      .pipe(
        catchError(this.error)
      );
  }

  updateProject(project: Project): Observable<Project> {
    // this.setHeaderAuthToken();
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('authorization', bearerToken);
    this.url = this.api + this.projectUrl;

    return this.httpClient.put<Project>(this.url + '/' + project.id, project, httpOptions);
  }
  deleteProject(projectid): Observable<Project> {
    const token = this.storage.getItem('loc8r-token');
    const bearerToken = 'JWT ' + token;
    httpOptions.headers.append('authorization', bearerToken);
    this.url = this.api + this.projectUrl;

    return this.httpClient.delete<Project>(this.url + '/' + projectid, httpOptions);
  }

  getArticleByDestination(category: string) {
    //TODO add a route that get the Project by category
    this.url = this.api + this.projectUrl;


    return this.httpClient.get<Project[]>(this.url + '/destination/' + category);
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