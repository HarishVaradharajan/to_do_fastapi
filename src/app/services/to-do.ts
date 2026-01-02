import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDo {

  
  // http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8000/tasks').pipe(
      map((response) => response),
      catchError((error) => {throw error;})
    );
  }

  addTask(taskData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/add_task', taskData).pipe(
      catchError((error) => { throw error; })
    );
  }

  editTask(task_id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/update/${task_id}`,{}).pipe(
      catchError((error) => { throw error; })
    );
  }

  taskredo(task_id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8000/redotask/${task_id}`,{}).pipe(
      catchError((error) => { throw error; })
    );
  }

  deleteTask(task_id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/delete/${task_id}`).pipe(
      catchError((error) => { throw error; })
    );
  }
}

