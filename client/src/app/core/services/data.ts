import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookmarkCreateUpdateRequest, BookmarkResponse, BookmarksResponse } from '@shared/types';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  #baseURL = environment.backendURL;
  #http = inject(HttpClient);

  getBookmarks(): Observable<BookmarksResponse> {
    return this.#http
      .get<BookmarksResponse>(`${this.#baseURL}/bookmark`)
      .pipe(catchError(this.handleError));
  }

  getBookmark(id: string): Observable<BookmarkResponse> {
    return this.#http
      .get<BookmarkResponse>(`${this.#baseURL}/bookmark/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBookmark(body: BookmarkCreateUpdateRequest) {
    return this.#http
      .post<BookmarkCreateUpdateRequest>(`${this.#baseURL}/bookmark`, body)
      .pipe(catchError(this.handleError));
  }

  updateBookmark(body: BookmarkCreateUpdateRequest, id: string) {
    return this.#http
      .put<BookmarkCreateUpdateRequest>(`${this.#baseURL}/bookmark/${id}`, body)
      .pipe(catchError(this.handleError));
  }

  deleteBookmark(id?: string) {
    return this.#http.delete(`${this.#baseURL}/bookmark/${id}`).pipe(catchError(this.handleError));
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
