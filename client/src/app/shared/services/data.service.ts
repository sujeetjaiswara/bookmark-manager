import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #baseURL = environment.backendURL;
  #http = inject(HttpClient);

  getBookmarks(): Observable<Bookmark[]> {
    return this.#http
      .get<Bookmark[]>(`${this.#baseURL}/bookmarks`)
      .pipe(catchError(this.handleError));
  }

  getBookmark(id: string): Observable<Bookmark> {
    return this.#http
      .get<Bookmark>(`${this.#baseURL}/bookmarks/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBookmark(body: Bookmark) {
    return this.#http
      .post<Bookmark>(`${this.#baseURL}/bookmarks/create`, body)
      .pipe(catchError(this.handleError));
  }

  updateBookmark(body: Bookmark) {
    return this.#http
      .put<Bookmark>(`${this.#baseURL}/bookmarks/update`, body)
      .pipe(catchError(this.handleError));
  }

  deleteBookmark(id?: string) {
    return this.#http.delete(`${this.#baseURL}/bookmarks/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
