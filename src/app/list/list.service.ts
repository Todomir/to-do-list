import { Injectable } from '@angular/core'
import { Task } from '../model/task.model';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:3000/tarefas';

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getTasks(): Observable<any> {
    return this.http.get(this.ROOT_URL).pipe(
      catchError(this.handleError)
    )
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  createTask(data: Task): Observable<any> {
    return this.http.post(this.ROOT_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  updateTask(data: Task, id: number): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/${id}`, data).pipe(
      catchError(this.handleError)
    )
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.ROOT_URL}/${id}`).pipe(
      catchError(this.handleError)
    )
  }
}