import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Bookmark } from '../interfaces/bookmark';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseURL = environment.backendURL;

  #http = inject(HttpClient);

  getBookmarks(): Observable<Bookmark[]> {
    return this.#http
      .get<Bookmark[]>(`${this.baseURL}/bookmarks`)
      .pipe(catchError(this.handleError));
  }

  createBookmark(body: Bookmark) {
    return this.#http
      .post<Bookmark>(`${this.baseURL}/bookmarks/create`, body)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
